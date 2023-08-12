// Canceled
import React from 'react'
import { usePublicClient, useWalletClient } from 'wagmi'
import { FallbackProvider, JsonRpcProvider, BrowserProvider, JsonRpcSigner } from 'ethers'

export function publicClientToProvider(publicClient) {
  const { chain, transport } = publicClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts && chain.contracts.ensRegistry ? chain.contracts.ensRegistry.address : undefined,
  }
  if (transport.type === 'fallback') {
    const providers = transport.transports.map(({ value }) => new JsonRpcProvider(value && value.url ? value.url : undefined, network))
    if (providers.length === 1) return providers[0]
    return new FallbackProvider(providers)
  }
  return new JsonRpcProvider(transport.url, network)
}

/** Hook to convert a viem Public Client to an ethers.js Provider. */
export function useEthersProvider({ chainId } = {}) {
  const publicClient = usePublicClient({ chainId })
  return React.useMemo(() => publicClientToProvider(publicClient), [publicClient])
}

export function walletClientToSigner(walletClient) {
    const { account, chain, transport } = walletClient
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts && chain.contracts.ensRegistry ? chain.contracts.ensRegistry.address : undefined,
    }
    const provider = new BrowserProvider(transport, network)
    const signer = new JsonRpcSigner(provider, account.address)
    return signer
  }
  
  export function useEthersSigner(options) {
    const { chainId } = options || {};
    const { data: walletClient } = useWalletClient({ chainId });
  
    return React.useMemo(
      () => (walletClient ? walletClientToSigner(walletClient) : undefined),
      [walletClient]
    );
  }


  
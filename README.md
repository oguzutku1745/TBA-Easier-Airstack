## TBA Easier
This project was designed to facilitate interactions with 6551 (Token Bound) Accounts as announced by the [EIP-6551 protocol](https://eips.ethereum.org/EIPS/eip-6551).

TBA Easier simplifies interactions with token-bound accounts. Users can view their NFTs, associated 6551 accounts, and the NFTs that these 6551 accounts hold.

Creating a new 6551 Account is as easy as a single click. There's no need to deploy external contracts unless you wish to customize your accounts.

## Features

- Wallet connection with [RainbowKit](https://www.rainbowkit.com)
- Display NFT gallery on the homepage
- Visual representation of 6551 Accounts and their NFT assets.
- Streamlined account creation with [wagmi](https://wagmi.sh)
   - Account creation parameter is automatically limited to 1 through inputs & saltFixer.
- Custom & Dynamic components for better UX



## How it works?
The project uses [Airstack](https://www.airstack.xyz) for indexing services. The key queries used are:
  - NFTFetch: Retrieves the NFTs of connected accounts.
  - tbaNfts: Fetches the 6551 accounts and their NFT assets for a specific NFT.



Note:
The Airstack documentation prescribes data passing as shown below. However, this approach led to issues in TBA Easier, such as variables being passed as "undefined".
```bash
import { useLazyQuery } from "@airstack/airstack-react";

const MyComponent = () => {
  const [fetch, { data, loading, error }] = useLazyQuery(query, variables);

```

To address this, I modified the data passing to:
```bash
  const [fetchTbaNfts, responseTbaNfts] = useLazyQuery(tbaNfts);

// And in hook:
      fetchTbaNfts({
      "tokenAddress": `${tokenDetails.address}`,
      "tokenId": `${tokenDetails.Id}` 
    })
```

>The Airstack team is aware of this situation, and I am actively communicating with them. I'd also like to express my gratitude for their support throughout the development process!

It utilizes [wagmi](https://wagmi.sh)'s hooks for:
  - Account operations (integrated with RainbowKit).
  - Efficient transactions through a combination of the following hooks
    - usePrepareContractWrite
    - useContractWrite
  - useWaitForTransaction for error handling and transaction state updates.



# Contributing

Pull requests are welcome. If you're considering major changes, kindly open an issue first to discuss your proposed alterations.

## Installation

First, clone the repo by

```bash
git clone https://github.com/oguzutku1745/TBA-Easier
```

Install the dependencies
```bash
npm run dev
```

Finally, start the development server
```bash
npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_PROJECT_ID` — Obtainable from [WalletConnect](https://cloud.walletconnect.com/sign-in)

`NEXT_PUBLIC_AIRSTACK_INIT` — Obtainable from [Airstack](https://app.airstack.xyz/)

## Contact
Feel free to reach out to me for any inquiries or collaboration

  - Email: [oguzutku1745@gmail.com](mailto:oguzutku1745@gmail.com)
  - Discord: kyatzu


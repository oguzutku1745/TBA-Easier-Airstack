import Menubar from "@/components/Navbar/Menubar"
import styles from './Home.module.css'
import { useState, useEffect } from "react";
import { init, useLazyQuery } from "@airstack/airstack-react";
import Image from 'next/image';
import AccountManagement from "@/components/AccountManagement/AccountManagement";
import { useRouter } from 'next/router'
init("59b3109f040748f9b4a038900c6fd3d5");

const Manage = () => {

    const router = useRouter();
    const [NftDetails, setNftDetails] = useState({});
    const [isNexted, setIsNexted] = useState(false)
    const [inputAddress, setInputAddress] = useState("");
    const [inputTokenId, setInputTokenId] = useState("");

    
    console.log(router.query)
    useEffect(() => {
      if(router.query){
      setInputAddress(router.query.address)
      setInputTokenId(router.query.Id)
      }
    },[router.query])


    const NftImage = `query MyQuery($tokenAddress: Address!, $tokenId: String!) {
      TokenNft(input: {address: $tokenAddress, tokenId: $tokenId, blockchain: polygon}) {
        id
        contentValue {
          image {
            extraSmall
            small
            medium
            large
            original
          }
        }
      }
    }`

    const TBAQuery = `query MyQuery($tokenAddress: Address, $tokenId: String) {
      Accounts(
        input: {blockchain: polygon, limit: 200, filter: {tokenAddress: {_eq: $tokenAddress}, tokenId: {_eq: $tokenId}}}
        ) {
          Account {
            address {
              addresses
              domains {
                name
                isPrimary
              }
              socials {
                dappName
                profileName
              }
            }
            implementation
          }
        }
      }`;

    const [fetchTba, tbaResponse] = useLazyQuery(TBAQuery);

    const [fetchImage, response] = useLazyQuery(NftImage);

    const nexted = () => {
      setIsNexted(true)
    }

    const handleAddressChange = (e) => {
        setInputAddress(e.target.value);
      };
      
      const handleTokenIdChange = (e) => {
        setInputTokenId(e.target.value);
      };
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
        setNftDetails({ address: inputAddress, Id: inputTokenId });
        nexted();
      };

      useEffect(() => {
        if (NftDetails && isNexted) {
          fetchImage({    
          "tokenAddress": `${NftDetails.address}`,
          "tokenId": `${NftDetails.Id}` 
        } );
        fetchTba({    
          "tokenAddress": `${NftDetails.address}`,
          "tokenId": `${NftDetails.Id}` 
        } );
        }
      }, [NftDetails, isNexted])

      return (
        <Menubar>
          <div className={styles.mainWrapper}>
            <div className={styles.manageContainer}>
              <div className={styles.inputAndAccountContainer}>
                <div className={styles.inputSec}>
                  <div className={styles.infoWriting}>You can connect your wallet to find your NFTs, or you can directly search for specific NFT.</div>
                  <div className={styles.inputAligner}>
                    <form className={styles.gapper} onSubmit={handleFormSubmit}>
                    <div className={styles.formGapDetailer}>
                      <span className={styles.inputFrontiers}>NFT Address</span> <input value={inputAddress} onChange={handleAddressChange} placeholder='Contract address' className={styles.inputBox} />
                    </div>
                    <div className={styles.formGapDetailer}>
                      <span className={styles.inputFrontiers}>Token Id</span> <input value={inputTokenId} onChange={handleTokenIdChange} placeholder='Token Id' className={styles.inputBox} />
                    </div>
                      <button className={styles.buttonx}>Fetch NFT</button>
                    </form>
                    {response.loading && <div>Loading...</div>}
                    {(response.data && isNexted) &&
                      <Image
                        className={styles.NFTImage}
                        src={response.data?.TokenNft?.contentValue?.image?.medium}
                        width={200}
                        height={200}
                        alt="NFT Display Picture"
                      />}
                  </div>
                </div>
      
                {(response.data && isNexted) &&
                  <div className={styles.accountManagementContainer}>
                    <AccountManagement tbaDetails={tbaResponse.data} NftDetails={NftDetails} />
                  </div>
                }
              </div>
      
              <footer className={styles.footer}>
                <a href="https://github.com/oguzutku1745" rel="noopener noreferrer" target="_blank">
                  Made with ❤️ by KyaTzu
                </a>
              </footer>
            </div>
          </div>
        </Menubar>
      );
      
}

export default Manage
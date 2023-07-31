import React from "react";
import Image from "next/image";
import styles from './NFTComponent.module.css'


const NFTComponent = ({ nfts, setTokenDetails }) => {

  console.log(nfts)

  return (

    <div styles={styles.nftItem} onClick={() => setTokenDetails({
     address: nfts.tokenAddress,
     Id: nfts.tokenId
    })}>
      {nfts.token.name}<br/>
      {nfts.tokenNfts?.contentValue?.image?.medium &&
      <Image
        src={nfts.tokenNfts.contentValue.image.medium}
        width={250}
        height={250}
        alt="NFT Display Picture"
      />
      }
    </div>
  );
};

export default NFTComponent;

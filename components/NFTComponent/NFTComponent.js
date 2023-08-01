import React, {useState} from "react";
import Image from "next/image";
import styles from './NFTComponent.module.css'


const NFTComponent = ({ nfts, setTokenDetails }) => {

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  const isImageNull = nfts.tokenNfts.contentValue.image === null;
  const isImageDefault = nfts.tokenNfts.contentValue.image && nfts.tokenNfts.contentValue.image.medium === "https://assets.airstack.xyz/image/nft/";

  const imageSrc = isImageNull || isImageDefault ? "/Noimg.jpeg" : nfts.tokenNfts.contentValue.image.medium;

  return (

    <div styles={styles.nftItem} onClick={() => setTokenDetails({
     address: nfts.tokenAddress,
     Id: nfts.tokenId
    })}>
      {nfts.token.name}<br/>
      { imageError ? 
      (      
        <Image
          src="/Brokenimg.png"
          width={250}
          height={250}
          alt="NFT Display Picture"
        />  
      ) : (
        imageSrc &&
            <Image
              src={imageSrc}
              width={250}
              height={250}
              alt="NFT Display Picture"
              onError={handleImageError}
      /> )}
    </div>
  );
};

export default NFTComponent;

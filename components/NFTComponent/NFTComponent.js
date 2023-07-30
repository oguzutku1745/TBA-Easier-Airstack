import React from "react";
import Image from "next/image";


const NFTComponent = ({ nfts, setTokenDetails }) => {

  console.log(nfts)

  return (
    <div>
      <div> 
          <div onClick={() => setTokenDetails({
           address: nfts.tokenAddress,
           Id: nfts.tokenId
          })}>
            <Image
              src={nfts.tokenNfts.contentValue.image.medium}
              width={500}
              height={500}
              alt="NFT Display Picture"
            />
          </div>
      </div>
    </div>
  );
};

export default NFTComponent;

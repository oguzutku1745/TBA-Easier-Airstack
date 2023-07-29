import React from "react";
import Image from "next/image";


const NFTComponent = ({ nfts, setContractAddress }) => {

  console.log(nfts)

  return (
    <div>
      <div> 
          <div onClick={() => setContractAddress(nfts.tokenAddress)}>
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

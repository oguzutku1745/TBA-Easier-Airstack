import styles from './AccountComponent.module.css';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const AccountComponent = ({ acc, index }) => {

  console.log(acc)

  const [showDetails, setShowDetails] = useState(false)
  const [maxHeight, setMaxHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight + "px";
      setMaxHeight(height);
    }
  }, []);

  const handleClick = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div>
      <tr className={styles.row} onClick={handleClick}>
        <td className={styles.cell}>{index + 1}</td>
        <td className={styles.cell}>{acc.address.addresses[0]}</td>
        <td className={styles.cell}>{acc.implementation}</td>
        <div className={`${styles.triangle} ${showDetails ? styles.triangleDown : ''}`}></div>
      </tr>
      <div 
        className={`${styles['detailContainer']} ${showDetails ? styles.open : styles.closed}`} 
        style={{ maxHeight: showDetails ? maxHeight : '0px' }}
        ref={contentRef}
      >
        { acc.address.tokenBalances.length > 0 ? (
        <div className={styles.headers}>
          <div></div>
          <div className={styles.tokenAddressHeader}>Token Address</div>
          <div className={styles.tokenIdHeader}>Token ID</div>
        </div>
        ): (
          <div className={styles.noAsset}>This account does not have any NFT assets :(</div>
        )}
        {acc?.address?.tokenBalances.map((nft, idx) => {
          const isImageNull = nft.tokenNfts?.contentValue?.image === null;
          const isImageDefault = nft.tokenNfts?.contentValue?.image && nft.tokenNfts.contentValue.image.extraSmall === "https://assets.airstack.xyz/image/nft/";
          const imageSrc = isImageNull || isImageDefault ? "/Noimg.jpeg" : nft.tokenNfts?.contentValue?.image?.extraSmall;

          return (
            <div key={idx} className={styles.tbaNftDetailDisplay}> 
              <Image 
                src={imageSrc}
                width={50}
                height={50}
                alt="Token Bound Account NFT Display Picture"
              />
              <div className={styles.tokenAddressAligner}>{nft.tokenAddress}</div>
              <div className={styles.tokenIdAligner}>{nft.tokenId}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountComponent;

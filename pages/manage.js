import Menubar from "@/components/Navbar/Menubar"
import styles from './Home.module.css'
import { useState } from "react";

const Manage = () => {

    const [NftDetails, setNftDetails] = useState({});
    const [isNexted, setIsNexted] = useState(false)
    const [inputAddress, setInputAddress] = useState("");
    const [inputTokenId, setInputTokenId] = useState("");

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

    return(
        <Menubar>
        <div className={styles.manageContainer}>
        <div className={styles.inputSec}>
          <div className={styles.infoWriting}>You can connect your wallet to find your NFTs, or you can directly search for spesific NFT.</div>
          <div className={styles.inputAligner}>
          <form className={styles.gapper} onSubmit={handleFormSubmit}>
            NFT Address: <input value={inputAddress} onChange={handleAddressChange} placeholder='Contract address' className={styles.inputBox} />
            Token Id: <input value={inputTokenId} onChange={handleTokenIdChange} placeholder='Token Id' className={styles.inputBox} />
            <button className={styles.buttonx}>Fetch NFT</button>
          </form>
          {(NftDetails && isNexted) && 
          <Image
            className={styles.NFTImage}
            src={tokenImage}
            width={200}
            height={200}
            alt="NFT Display Picture"
          />}
          </div>
        </div>
        </div>
        <footer className={styles.footer}>
        <a href="https://github.com/oguzutku1745" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by KyaTzu
        </a>
      </footer>
        </Menubar>
    )
}

export default Manage
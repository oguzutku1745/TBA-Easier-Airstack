import styles from './TxModal.module.css'
import Image from 'next/image';

const TxModal = ({ isOpen, onClose, error, isLoading, isSent, isSuccess }) => {
  if (!isOpen) return null;
  console.log(error)
  console.log(isLoading)
  console.log(isSent)
  console.log(isSuccess)

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}>
    <div>
    <div onClick={onClose} className={styles.modalClose}>Close</div>
    <div className={styles.txInfo}>
      {error ? (
        error.includes("User rejected the request") ? (
          "Request has rejected"
          ) : (
            error
            )
        ) : (
          <>
        <div>
          Your account will be created after you signed the transaction
            <Image
              src="/giphy.gif"
              width={100}
              height={100}
              alt="Loading GIF"
            />
        </div>
        </>
        )
      }
    </div>
    <br/>
    
    
    <br/>
  </div>
  </div>
  );
};

export default TxModal
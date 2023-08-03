import styles from './AccountManagement.module.css'
import PolygonABI from '@/RegistryABIPolygon';
import { useState, useEffect } from 'react';
import {
    useAccount,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
    useContractRead
} from 'wagmi';

const AccountManagement = ({ NftDetails, tbaDetails }) => {

    const [currentImplementations, setCurrentImplementations] = useState([])
    const [implementationInput, setImplementationInput] = useState("")
    const [showInput, setShowInput] = useState(false);
    const [saltFixer, setSaltFixer] = useState()

    useEffect(() => {
      const implementationArray = tbaDetails?.Accounts?.Account?.map(acc => acc.implementation);
      if (implementationArray) { 
        setCurrentImplementations(implementationArray);
      }
    }, [tbaDetails]);

    console.log(currentImplementations)

    const { config } = usePrepareContractWrite({
        address: '0x02101dfB77FDE026414827Fdc604ddAF224F0921',
        abi: PolygonABI,
        functionName: 'createAccount',
        chainId: 137,
        args: [
            `${implementationInput}`,
            137,
            `${NftDetails.address}`,
            NftDetails.Id,
            saltFixer,
            '0x',
        ],
    });

    const contractWrite = useContractWrite(config);

    const waitForTransaction = useWaitForTransaction({
        hash: contractWrite.data?.hash,
    });

    const handleImplementation = (e) => {
      setImplementationInput(e.target.value)
    }

    const handleCreateTBA = () => {
        const count = currentImplementations.filter(impl => impl === implementationInput).length;
        console.log(`The count of the implementation ${implementationInput} is ${count}`);
        setSaltFixer(count)
        contractWrite.write?.();
    };

    return (
      <div>
          <button
              onClick={() => setShowInput(!showInput)}
              className={styles.createAccount}
          >
              Create Account
          </button>
          <div className={`${styles['inputContainer']} ${showInput ? styles.open : styles.closed}`}>
              <input value={implementationInput} placeholder="Implementation address" className={styles.inputField} onChange={handleImplementation} />
              <button
                  onClick={handleCreateTBA}
                  className={styles.createTbaButton}
              >
                  Create TBA Account
              </button>
          </div>
          {contractWrite.isLoading && <div>Sign the Transaction</div>}
          {contractWrite.isSuccess && <div>Transaction sent</div>}
          {waitForTransaction.isSuccess && <div>Minted Successfully</div>}
      </div>
  );
}

export default AccountManagement

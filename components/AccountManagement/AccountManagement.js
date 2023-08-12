import styles from './AccountManagement.module.css'
import PolygonABI from '@/RegistryABIPolygon';
import { useState, useEffect } from 'react';
import {
    useWaitForTransaction,
    usePrepareContractWrite,
    useContractWrite
} from 'wagmi';
import TxModal from '../TxModal/TxModal'
import { useDebounce } from '@/helper/useDebounce';


const AccountManagement = ({ NftDetails, tbaDetails }) => {

    const [currentImplementations, setCurrentImplementations] = useState([])
    const [implementationInput, setImplementationInput] = useState("")
    const debouncedImplementationInput = useDebounce(implementationInput)
    const [showInput, setShowInput] = useState(false);
    const [saltFixer, setSaltFixer] = useState()
    const [isModalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [shouldProceed, setShouldProceed] = useState(false);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);


    const {config} = usePrepareContractWrite({
        address: '0x02101dfB77FDE026414827Fdc604ddAF224F0921',
        abi: PolygonABI,
        functionName: 'createAccount',
        chainId: 137,
        args: [
            debouncedImplementationInput,
            137,
            `${NftDetails.address}`,
            NftDetails.Id,
            saltFixer,
            '0x',
        ],
    });

    const {data, isLoading, isSuccess, error, reset, write} = useContractWrite(config);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
        const implementationArray = tbaDetails?.Accounts?.Account?.map(acc => acc.implementation);
        if (implementationArray) {
            setCurrentImplementations(implementationArray);
        }
    }, [tbaDetails]);

    console.log("current Implementations: ", currentImplementations)

    useEffect(() => {
        if (error) {
            setErrorMessage(error?.details);
        }
    }, [error]);

    const waitForTransaction = useWaitForTransaction({
        hash: data?.hash,
    });

    let buttonTimeout; 

    const handleImplementation = (e) => {
        setImplementationInput(e.target.value)

        if (buttonTimeout) clearTimeout(buttonTimeout);

        if (/^0x[a-fA-F0-9]{40}$/.test(e.target.value)) {
            buttonTimeout = setTimeout(() => {
                setIsButtonEnabled(true); 
            }, 1000);
        } else {
            setIsButtonEnabled(false); 
        }
    }

    const saltCalculator = () => {
        const count = currentImplementations.filter(impl => impl === implementationInput).length;
        console.log(`The count of the implementation ${implementationInput} is ${count}`);
        setSaltFixer(count);
    };
    
    useEffect(() => {
        if (shouldProceed) {
            write?.();
            openModal();
            console.log("Attempting to write to contract...");
    

            setShouldProceed(false);
        }
    }, [shouldProceed]);
    
    const handleCreateTBA = () => {
        setErrorMessage("");
        reset();
    
        if (!/^0x[a-fA-F0-9]{40}$/.test(implementationInput)) {
            setErrorMessage("Invalid Ethereum address.");
            openModal();
            return;
        }
    
        saltCalculator();
    

        setShouldProceed(true);
    };

    return (
        <div className={styles.dropDownWrapper}>
            <div
                onClick={() => 
                    setShowInput(!showInput)
                }
                className={styles.createAccount}
            >
                <div className={`${styles.triangle} ${showInput ? styles.triangleDown : ''}`}></div>
                <span className={styles.createAccountText}>Create Token Bound Account</span>
            </div>
            <div className={`${styles['inputContainer']} ${showInput ? styles.open : styles.closed}`}>
                <div className={styles.addressText}>Implementation Address (Starts with 0x)</div>
                <input value={implementationInput} placeholder="Address" className={styles.inputBox} onChange={handleImplementation} />
                <button
                    onClick={handleCreateTBA}
                    className={styles.createTbaButton}
                    disabled={!isButtonEnabled}
                >
                    Create Account
                </button>
            </div>
            {isModalOpen && (
                <TxModal isLoading={isLoading} isSent={isSuccess} isSuccess={waitForTransaction.isSuccess} error={errorMessage} isOpen={isModalOpen} isFailed={waitForTransaction.isError} onClose={closeModal} />
            )}
        </div>
    );
}

export default AccountManagement
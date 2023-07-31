import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = ({resetPage}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.menu}>
        <Link onClick={resetPage} className={styles.card} href="/">
          Find Accounts
        </Link>
        <Link className={styles.card} href="/manage">
            Manage Accounts
          </Link>
      </div>
      <div className={styles.wallet}>
        <ConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;

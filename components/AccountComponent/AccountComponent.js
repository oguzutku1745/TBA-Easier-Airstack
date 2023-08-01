import styles from './AccountComponent.module.css';

const AccountComponent = ({ acc, index }) => {
  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{index + 1}</td>
      <td className={styles.cell}>{acc.address.addresses[0]}</td>
      <td className={styles.cell}>{acc.implementation}</td>
    </tr>
  );
};

export default AccountComponent;

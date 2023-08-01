import styles from './AccountComponent.module.css';

const AccountComponent = ({acc, index}) => {

    console.log(index)

    return(
        <div>
        <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            <td className={styles.cell}>Index</td>
            <td className={styles.cell}>Account Address</td>
            <td className={styles.cell}>Implementation Address</td>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row}>
            <td className={styles.cell}>{index + 1}</td>
            <td className={styles.cell}>{acc.address.addresses[0]}</td>
            <td className={styles.cell}>{acc.implementation}</td>
          </tr>
        </tbody>
      </table>
      </div>
    )
}

export default AccountComponent
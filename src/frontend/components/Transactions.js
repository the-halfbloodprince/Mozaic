import React, { useContext } from 'react'
import { transactionsContext } from '../contexts/contexts'
import TransactionCard from './TransactionCard'
import styles from './Transactions.module.css'
import { FaEthereum as EtherIcon} from 'react-icons/fa'
import { MdDateRange as DateIcon } from 'react-icons/md'

const Transactions = () => {

    const [transactions,_] = useContext(transactionsContext)
  return (
    <div className={styles.myTransactions} >
        <div className={styles.transactionCard} >
            <div className={`${styles.trans__heading} ${styles.trans__id}`}>Sl. No</div>
            <div className={`${styles.trans__heading} ${styles.trans__name}`}>NFT name</div>
            <div className={`${styles.trans__heading} ${styles.trans__hash1}`}>From</div>
            <div className={`${styles.trans__heading} ${styles.trans__hash2}`}>To</div>
            <div className={`${styles.trans__heading} ${styles.trans__date}`}>  <DateIcon/>    Date </div>
            <div className={`${styles.trans__heading} ${styles.trans__eth}`}> <EtherIcon/> ETH</div>
        </div>
        <div className={styles.transactionList} >
            {
                transactions.map((transactioncard, i)=> {
                    const SlNo=i+1;
                    return <TransactionCard key={i} trans={transactioncard} cardId={SlNo} />;})
            }
        </div>
    </div>
  )
}

export default Transactions

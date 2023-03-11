import React, { useContext } from 'react'
import { accountContext, transactionsContext } from '../contexts/contexts'
import TransactionCard from './TransactionCard'
import styles from './Transactions.module.css'
import { FaEthereum as EtherIcon} from 'react-icons/fa'
import { MdDateRange as DateIcon } from 'react-icons/md'

const Transactions = ({ which = null }) => {

    const [transactions, setTransactions] = useContext(transactionsContext)
    const [account, setAccount] = useContext(accountContext)

    let transactionsToShow
    
    if (!which) {
        transactionsToShow = transactions
    } else if (which === 'mine') {
        transactionsToShow = transactions.filter(t => (t.from.toLowerCase() === account.toLowerCase() || t.to.toLowerCase() === account.toLowerCase()))
    } else {
        transactionsToShow = transactions.filter(t => ((t.from.toLowerCase() === which.toLowerCase() || t.to.toLowerCase() === which.toLowerCase()) && (t.from.toLowerCase() === account || t.to.toLowerCase() === account)))
    }

    return transactionsToShow.length === 0 ? (
        <div className={styles.noTransactions}>
            No Transactions
        </div>
    ) : (
        <div className={styles.transactions} >
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
                    transactionsToShow.map((transactioncard, i)=> {
                        const SlNo=i+1;
                        return <TransactionCard key={i} trans={transactioncard} cardId={SlNo} />;})
                }
            </div>
        </div>
    )
}

export default Transactions

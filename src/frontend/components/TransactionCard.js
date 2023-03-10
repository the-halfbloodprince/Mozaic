import React from 'react';
import styles from './TransactionCard.module.css';
import {BiTransferAlt as TranferIcon } from 'react-icons/bi'
import {AiOutlineArrowRight as ToIcon } from 'react-icons/ai'
import { useClipboard } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import moment from 'moment'

const TransactionCard = ({ trans, cardId }) => {
  const transaction = trans;
  const clipboard = useClipboard({ timeout: 500 })
  const copy = (str) => {
        clipboard.copy(str)
        notifications.show({
            title: 'Copied to clipboard',
            message: 'Hash copied to clipboard',
            color: 'lime'
        })
  }

  const date = moment(transaction.timestamp)

  const dateString = date.format('DD MMM YYYY')
  // const dateString = moment(date).toNow()


//   const cardId = props.cardId;
  return (
    <div className={styles.transactionCard} >
        <div className={styles.tcardId}>{cardId}</div>
        <div className={styles.tname}>{transaction.nftName}</div>
        <div className={styles.thash1} onClick={() => copy(transaction.from)}> <div className={styles.inner__hash}>{transaction.from.toString().substring(0, 10)}...{transaction.from.toString().slice(-3)}</div> </div>
        <div className={styles.thash2} onClick={() => copy(transaction.to)} > <div className={styles.inner__hash}>{transaction.to.toString().substring(0, 10)}...{transaction.to.toString().slice(-3)}</div> </div>
        <div className={styles.tdate} >{dateString}</div>
        <div className={styles.tamount} >{transaction.amount.toString()}</div>
    </div>
  )
}
export default TransactionCard;
import React from 'react'
import styles from './NFTCard.module.css'

const NFTCard = ({ nft: {name, image, price, onSale}, actionText = null, actionFunc = null }) => (
    <div className={styles.nftcard}>
        { actionText && <div className={styles.action} onClick={actionFunc} > {actionText} </div> }
        <img className={styles.img} src={image} alt={name} />
        <div className={styles.info}>
            <p className={styles.name}> {name} </p>
            <p className={styles.price}> {onSale ? `${price} ETH` : 'Unlisted'} </p>
        </div>
    </div>
)

export default NFTCard
import React from 'react'
import styles from './NFTCard.module.css'

const NFTCard = ({ nft: {name, img, price}, actionText }) => (
    <div className={styles.nftcard}>
        { actionText && <div className={styles.action}> {actionText} </div> }
        <img className={styles.img} src={img} alt={name} />
        <div className={styles.info}>
            <p className={styles.name}> {name} </p>
            <p className={styles.price}> {price} ETH </p>
        </div>
    </div>
)

export default NFTCard
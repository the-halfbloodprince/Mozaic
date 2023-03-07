import React from 'react'
import styles from './NFTCard.module.css'
import { ethers } from "ethers";

const NFTCard = ({ nft: {name, image, totalPrice, onSale,category}, actionText = null, actionFunc = null }) => {
// console.log(price);

    return (
    <div className={styles.nftcard}>
        { actionText && <div className={styles.action} onClick={actionFunc} > {actionText} </div> }
        <img className={styles.img} src={image} alt={name} />
        <div className={styles.info}>
            <p className={styles.name}> {name} </p>
            <p className=""> {category} </p>
            <p className={styles.price}> {onSale ? `${ethers.utils.formatEther(totalPrice)} ETH` : 'Unlisted'} </p>
        </div>
    </div>)
}


export default NFTCard
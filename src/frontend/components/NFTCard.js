import React from 'react'
import styles from './NFTCard.module.css'
import { ethers } from "ethers";
import { useNavigate } from 'react-router';
import Tilt from 'react-parallax-tilt';

const NFTCard = ({ nft: {itemId, name, image, totalPrice, onSale, category}, actionText = null, actionFunc = null }) => {
// console.log(price);

    const navigate = useNavigate()

    return (
            <div className={styles.nftcard}>
                { actionText && <div className={styles.action} onClick={actionFunc} > {actionText} </div> }
                <div onClick={() => navigate(`/nft/${itemId}`)}>
                    <img className={styles.img} src={image} alt={name} />
                    <p className={styles.category}> {category} </p>
                    <div className={styles.info}>
                        <p className={styles.name}> {name} </p>
                        <p className={styles.price}> {onSale ? `${ethers.utils.formatEther(totalPrice)} ETH` : 'Unlisted'} </p>
                    </div>
                </div>
            </div>
    )
}


export default NFTCard
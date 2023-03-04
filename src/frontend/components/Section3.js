import React from 'react'
import styles from "./Section3.module.css"

function Section3() {
  return (
    <div className={styles.Section}>
        <div className={styles.Heading}>How it Works!</div>
        <div className={styles.Cards}>
            <div className={styles.Card1}>
                <img className={styles.img} src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677928475/sec3_1_vxnkqt.png" alt="" />
                <p> <strong> Create an account: </strong> Sign up for an account and connect your wallet to get started.</p>
            </div>
            <div className={styles.Card2}>
                <img className={styles.img}  src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677928475/sec3_2_gjxw2s.png" alt="" />
                <p> <strong> Browse and discover: </strong>Browse our curated selection of NFTs or search for something specific.</p>
            </div>
            <div className={styles.Card3}>
                <img className={styles.img}  src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677928475/sec3_3_hrbwky.png" alt="" />
                <p> <strong>Buy and sell: </strong>Use cryptocurrency to purchase NFTs or sell your own digital assets to other collectors.</p>
            </div>
        </div>
    </div>
  )
}

export default Section3
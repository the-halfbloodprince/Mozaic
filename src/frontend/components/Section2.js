import React from 'react'
import styles from "./Section2.module.css"

function Section2() {
  return (
    <div className={styles.section2}>
        <div className={styles.textSection}>
            <p>
            Our <span>NFT Marketplace</span> is a platform that allows creators and collectors to buy, sell, and trade digital assets securely and transparently. With our platform, you can mint and sell your own unique digital assets, discover and purchase one-of-a-kind NFTs, and connect with a community of like-minded individuals who share your passion for digital ownership.
            </p>
        </div>
        <div className={styles.imageSection}><img src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677928476/sec2_cards_vebnjj.png" alt="" /></div>
    </div>
  )
}

export default Section2
import React from 'react'
import styles from "./Section5.module.css"
import { FaGlobeAmericas } from 'react-icons/fa'

function Section5() {
  return (
    <div className={styles.Section}>
      <div><img className={styles.image} src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677952365/bitcoin_o4x9ca.png" alt="" /></div>
        <div className={styles.Header}>
            <div className={styles.Heading}>Get Started</div>
            <div className={styles.Content}>Own your unique creations of Art <br /> Innovate with blockchain. <br /> Innovate.</div>
            <div className={styles.button}>
            <span className={styles.buttonText}>Create Your First NFT</span>
            <FaGlobeAmericas />
          </div>
        </div>
      <div><img className={styles.image2}  src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677952348/Group_8_uaylep.png" alt="" /></div>
    </div>
  )
}

export default Section5
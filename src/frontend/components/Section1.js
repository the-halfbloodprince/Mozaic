import React from 'react';
import styles from './Section1.module.css';
import { FaGlobeAmericas } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Section1 = () => {
  return (
    <div className={styles.section1}>
      <div className={styles.textSection}>
        <div className={styles.subheading}>Welcome to the</div>
        <div className={styles.heading}>NFT Marketplace</div>
        <div className={styles.para}><p>Join us in the next era of ownership and creativity.  Discover a world where digital art and collectibles come to life through unique NFTs.</p></div>
        <Link to="/marketplace">
          <div className={styles.button}>
            <span className={styles.buttonText}>Explore Marketplace</span>
            <FaGlobeAmericas />
          </div>
        </Link>
      </div>
      <div>
        <img className={styles.image} src="https://res.cloudinary.com/dkoxgwtku/image/upload/v1677928475/landing_image_qom0bp.png" alt="" />
      </div>
    </div>
  )
}

export default Section1
import { Rating } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router'
import styles from './ProfileCard.module.css'

function ProfileCard({ profile: { walletAddress, name, profileImageUrl, rating } }) {
  
    const navigate = useNavigate()
  
    return (
    <div className={styles.profileCard}>
        {/* { actionText && <div className={styles.action} onClick={actionFunc} > {actionText} </div> } */}
        <div onClick={() => navigate(`/profile/${walletAddress}`)}>
            <img className={styles.img} src={profileImageUrl} alt={name} />
            <div className={styles.info}>
                <p className={styles.name}> {name} </p>
                <p className={styles.rating}> <Rating value={rating.count !== 0 ? (rating.sum / rating.count) : 0 } size="xs" readOnly  /> </p>
                {/* <p className={styles.price}> {onSale ? `${ethers.utils.formatEther(totalPrice)} ETH` : 'Unlisted'} </p> */}
            </div>
        </div>
    </div>
  )
}

export default ProfileCard
import React from 'react'
import styles from "./NFTProductScreen.module.css"
import { BiCartDownload as CartIcon } from "react-icons/bi";
function NFTProductScreen() {

    const img = "https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/A_cute_adorable_baby_engineer_robot_made_of_crysta_zcel22.jpg";

  return (
    <div className= {styles.Page}>
        <div className={styles.ImageContainer}>
            <img src={img} className= {styles.Image}alt="NFT" />
        </div>
        <div className={styles.TextContainer}>
            <div className= {styles.Heading}>American Boy</div>
            <div>Captain America is the best avenger. He is the fricking American Boy...</div>
            <div className= {styles.Price}>Current price: 0.005 ETH</div>
            <div className= {styles.Button}>Buy Now <CartIcon className={styles.CartIcon} /></div>
            <div className= {styles.Heading2}>Details</div>
            <div className= {styles.Details}>0x696969696969696969</div>
            <div className= {styles.Details}><strong>Category:</strong>  3D art, Tech, Fiction</div>
            <div className= {styles.Details}><strong>Creator:</strong> Ajay Orochimaru</div>
            <div className= {styles.Details}><strong>Current Owner:</strong> Sagar Varade</div>
            <div className= {styles.Details}><strong>Created on:</strong> 04-03-2022</div>
        </div>
    </div>
  )
}

export default NFTProductScreen
import React, { useContext, useEffect } from 'react'
import styles from "./NFTProductScreen.module.css"
import { BiCartDownload as CartIcon } from "react-icons/bi";
import { useMatches, useLoaderData, useParams } from 'react-router-dom';
import { NFTsContext } from '../contexts/contexts'

function NFTProduct ({ currentNFT }) {
  
  const img = "https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/A_cute_adorable_baby_engineer_robot_made_of_crysta_zcel22.jpg";
  
  return (
    <div className= {styles.Page}>
          <div className={styles.ImageContainer}>
              <img src={img} className= {styles.Image}alt="NFT" />
          </div>
          <div className={styles.TextContainer}>
              <div className= {styles.Heading}>{currentNFT.name}</div>
              <div>{currentNFT.description}</div>
              <div className= {styles.Price}>Current price: {currentNFT.price.toString()} ETH</div>
              <div className= {styles.Button}>Buy Now <CartIcon className={styles.CartIcon} /></div>
              <div className= {styles.Heading2}>Details</div>
              <div className= {styles.Details}>ID: {currentNFT.itemId.toString()}</div>
              <div className= {styles.Details}><strong>Category: {currentNFT.category} </strong></div>
              {/* <div className= {styles.Details}><strong>Creator:</strong> {currentNFTseller} </div> */}
              {/* <div className= {styles.Details}><strong>Current Owner:</strong> {currentNFT} </div> */}
              <div className= {styles.Details}><strong>Seller:</strong> {currentNFT.seller} </div>
              <div className= {styles.Details}><strong>Created on:</strong> 04-03-2022</div>
          </div>
      </div>
  )
}

function NFTProductScreen() {

  const [NFTs, setNFTs] = useContext(NFTsContext)
  const { itemId: id } = useParams()
  // const x = useLoaderData()
  // console.log(id)

    console.log(NFTs)
    
    let currentNFT
    
    currentNFT = NFTs.find((n) => {
      console.log('rgudcdcvdc')
      return (n.itemId == id)
    })
  
    console.log(currentNFT)


    return currentNFT ? <NFTProduct currentNFT={currentNFT} /> : <div></div>
}

export default NFTProductScreen
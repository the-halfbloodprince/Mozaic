import React, { useContext, useEffect, useState } from 'react'
import styles from "./NFTProductScreen.module.css"
import { BiCartDownload as CartIcon } from "react-icons/bi";
import { useMatches, useLoaderData, useParams, Link } from 'react-router-dom';
import { accountContext, marketplaceContext, needrefreshContext, NFTsContext } from '../contexts/contexts'
import { SERVER_URL } from '../globals/variables';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { Modal, Rating } from '@mantine/core';

function NFTProduct ({ currentNFT }) {

  const [account, setAccount] = useContext(accountContext)
  const [marketplace, setMarketplace] = useContext(marketplaceContext)
  const [needRefresh, setNeedRefresh] = useContext(needrefreshContext)

  const [opened, { open, close }] = useDisclosure(false);

  const [rating, setRating] = useState(5)

  let seller

  const handleRatingSubmit = () => {

    console.log('rating given: ', rating)

      axios.post(`${SERVER_URL}/updateRating`, {
          rating: rating,
          walletAddress: seller.toLowerCase()
      })

      notifications.show({
          title: 'Thanks for the feedback!',
          message: 'Thanks for your valuable feedback',
          color: 'lime'
      })

      close()

  }
  
  const img = "https://res.cloudinary.com/dkoxgwtku/image/upload/v1677942841/A_cute_adorable_baby_engineer_robot_made_of_crysta_zcel22.jpg";
  
  const buyItem = async (item) => {
    
    seller = item.seller
    
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    
    open()

    setNeedRefresh(true)
  };

  return (
    <div className= {styles.Page}>
          <Modal className={styles.Floating} opened={opened} onClose={close} title="Rate the seller" centered >
              <div className={styles.modalContainer}>
                  <p className={styles.ratetext}>Rate the seller you just bought an NFT from. Your rating helps the platform be more reliable and safe.</p>
                  <Rating size={'xl'} fractions={2} className={styles.stars} value={rating} onChange={setRating} />
                  {/* <input className={styles.modalinput} type="number" value={rating} onChange={(e) => setPrice(e.target.value)} /> */}
                  <button className={styles.modalbutton} onClick={handleRatingSubmit}>Rate the seller!</button>
              </div>
          </Modal>
          <div className={styles.ImageContainer}>
              <img src={currentNFT.image} className= {styles.Image}alt="NFT" />
          </div>
          <div className={styles.TextContainer}>
              <div className= {styles.Heading}>{currentNFT.name}</div>
              <div>{currentNFT.description}</div>
              <div className= {styles.Price}>Current price: {currentNFT.price.toString()} ETH</div>
              <div className= {`${styles.Button} ${(currentNFT.seller.toLowerCase() == account) && styles.disabledButton}`} onClick={(currentNFT.seller.toLowerCase() != account) && (() => buyItem(currentNFT.itemId))}>Buy Now <CartIcon className={styles.CartIcon} /></div>
              <div className= {styles.Heading2}>Details</div>
              <div className= {styles.Details}>ID: {currentNFT.itemId.toString()}</div>
              <div className= {styles.Details}><strong>Category: {currentNFT.category} </strong></div>
              {/* <div className= {styles.Details}><strong>Creator:</strong> {currentNFTseller} </div> */}
              {/* <div className= {styles.Details}><strong>Current Owner:</strong> {currentNFT} </div> */}
              <Link to={`/profile/${currentNFT.seller}`}><div className= {styles.Details}><strong>Seller:</strong> {currentNFT.seller} </div></Link>
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
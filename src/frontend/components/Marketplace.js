import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";
import Loading from "./AwaitingConnection";
import { HashLoader as LoaderAnim } from "react-spinners";
import { categories, SERVER_URL } from '../globals/variables'
import styles from "./marketplace.module.css";
import NFTCard from "./NFTCard";
import { accountContext, marketplaceContext, needrefreshContext, nftContext, NFTsContext } from "../contexts/contexts";
import { useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Rating } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const MarketPlaceMain = () => {

  const navigate = useNavigate()

  const [account, setAccount] = useContext(accountContext)
  const [marketplace, setMarketplace] = useContext(marketplaceContext)
  const [nft, setnft] = useContext(nftContext)
  const [needRefresh, setNeedRefresh] = useContext(needrefreshContext)

  const  [activeCategory, setActiveCategory] = useState('All')
  const [opened, { open, close }] = useDisclosure(false);

  const [rating, setRating] = useState(5)
  let seller

  const handleRatingSubmit = () => {

    console.log('submitted')

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


  const allCategories = ['All', ...categories]

  const [NFTs, setNFTs] = useContext(NFTsContext);

  const NFTsToShow = NFTs.filter((n) => (activeCategory === 'All' || activeCategory === n.category))
  

  const buyItem = async (item) => {
    
    seller = item.seller
    notifications.show({
        title: 'Please approve the transaction via metamask',
        message: 'Please approve the transaction via metamask',
        loading: true,
        color: 'lime'
    })
    // await (await nft.approve(marketplace.address, item.itemId)).wait();



    await (
      
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();

    setNeedRefresh(true)

    open()
  };

  return (
    <div>
      <Modal className={styles.Floating} opened={opened} onClose={close} title="Rate the seller" centered >
          <div className={styles.modalContainer}>
              <p className={styles.ratetext}>Rate the seller you just bought an NFT from. Your rating helps the platform be more reliable and safe.</p>
              <Rating size={'xl'} fractions={2} className={styles.stars} value={rating} onChange={setRating} />
              {/* <input className={styles.modalinput} type="number" value={rating} onChange={(e) => setPrice(e.target.value)} /> */}
              <button className={styles.modalbutton} onClick={handleRatingSubmit}>Rate the seller!</button>
          </div>
      </Modal>
      <div className={styles.imgSection}>
        <div className={styles.Card}>
          <div className={styles.Card__number}>30+</div>
          <div className={styles.Card__heading}>Users</div>
        </div>
        <div className={styles.Card}>
          <div className={styles.Card__number}>150+</div>
          <div className={styles.Card__heading}>NFTs</div>
        </div>
        <div className={styles.Card}>
          <div className={styles.Card__number}>30+</div>
          <div className={styles.Card__heading}>Sellers</div>
        </div>
      </div>

      <div className={styles.marketplaceContent}>
          
          <div className={styles.marketplaceCategories}>
            {/* tags */}
              <div className={styles.toggleBtns}>
                {
                    allCategories.map((categ) => (
                      <button className={`${styles.toggleBtn} ${activeCategory === categ && styles.activeBtn}`} onClick={() => setActiveCategory(categ)}> { categ } </button>
                    ))
                }
                  {/* <div className={`${styles.toggleBtn} ${activeCategory === 'Your Transactions' && styles.activeBtn}`} onClick={() => setActiveCategory('Your Transactions')}>My Transactions</div> */}
              </div>

              <div className={styles.NFTGroup}>
                <p className={styles.selectedCat}> {activeCategory} NFTs </p>
                  <div className={styles.marketplaceNFTs}>
                        {/* cards */}
                      {
                          NFTs.filter(n => n.onSale).filter(n => (activeCategory === 'All' || activeCategory === n.category)).length === 0 ? (
                            <div className={styles.nothingToShow__container}>
                                <div className={styles.nothingToShow__text}>No NFTs listed yet</div>
                                <iframe className={styles.nothingToShow} src="https://giphy.com/embed/KKOMG9EB7VqBq" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                            </div>
                          ) : (NFTs
                            .filter(n => n.onSale)
                            .filter(n => (activeCategory === 'All' || activeCategory === n.category))
                            .map((nft) => (
                              <NFTCard
                                key={nft.itemId}
                                nft={nft}
                                actionText={nft.seller.toLowerCase() != account ? "Buy" : "See your NFT"}
                                actionFunc={
                                  nft.seller.toLowerCase() != account
                                    ? () => buyItem(nft)
                                    : () => navigate(`/nft/${nft.itemId}`)
                                }
                              />
                            )))
                      }
                    </div>
              </div>
              
          </div>
        </div>

    </div>
  );
};

const Marketplace = () => {

  const [account, setAccount] = useContext(accountContext)
  
  return account ? (
    <MarketPlaceMain />
  ) : (
    <Loading
      loadingText="Connect to Wallet for access"
      loadingIcon={<LoaderAnim color="#B0F122" />}
    />
  );
  // connection ? (
  //   <h1>Awaiting Connection</h1>
  // ) : (
  //   <div className="flex justify-center">
  //   {items.length > 0 ?
  //     <div className="px-5 container">
  //       <Row xs={1} md={2} lg={4} className="g-4 py-5">
  //         {items.map((item, idx) => (
  //           <Col key={idx} className="overflow-hidden">
  //             <Card>
  //               <Card.Img variant="top" src={item.image} />
  //               <Card.Body color="secondary">
  //                 <Card.Title>{item.name}</Card.Title>
  //                 <Card.Text>
  //                   {item.description}
  //                 </Card.Text>
  //               </Card.Body>
  //               <Card.Footer>
  //                 <div className='d-grid'>
  //                   <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
  //                     Buy for {ethers.utils.formatEther(item.totalPrice)} ETH
  //                   </Button>
  //                 </div>
  //               </Card.Footer>
  //             </Card>
  //           </Col>
  //         ))}
  //       </Row>
  //     </div>
  //     : (
  //       <main style={{ padding: "1rem 0" }}>
  //         <h2>No listed assets</h2>
  //       </main>
  //     )}
  // </div>
  // )
};

export default Marketplace;

  
        // {
        //     NFTs['loading'] ? <p>Loading marketplace items...</p> : (
        //       <div>
        //         {/* tags */}
        //         <div className={styles.toggleBtns}>
        //           {
        //               allCategories.map((categ) => (
        //                 <button className={`${styles.toggleBtn} ${activeCategory === categ && styles.activeBtn}`} onClick={() => setActiveCategory(categ)}> { categ } </button>
        //               ))
        //           }
        //             {/* <div className={`${styles.toggleBtn} ${activeCategory === 'Your Transactions' && styles.activeBtn}`} onClick={() => setActiveCategory('Your Transactions')}>My Transactions</div> */}
        //         </div>
        //         {/* cards */}
        //         {NFTs.map((nft) => (
        //           <NFTCard
        //             // key={nft.}
        //             nft={nft}
        //             actionText={nft.seller.toLowerCase() != account ? "Buy" : null}
        //             actionFunc={nft.seller.toLowerCase() != account ? () => buyItem(nft) : null}
        //           />
        //         ))}
        //       </div>
        //     )
        // }
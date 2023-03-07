import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { Row, Col, Card, Button } from "react-bootstrap";
import Loading from "./AwaitingConnection";
import { HashLoader as LoaderAnim } from "react-spinners";

import styles from "./marketplace.module.css";
import NFTCard from "./NFTCard";
import { accountContext, marketplaceContext, nftContext, NFTsContext } from "../contexts/contexts";

const MarketPlaceMain = () => {

  const [account, setAccount] = useContext(accountContext)
  const [marketplace, setMarketplace] = useContext(marketplaceContext)
  const [nft, setnft] = useContext(nftContext)

  console.log(marketplace)
  // const [nfts, setnft] = useContext(nftContext)
  // const [account, setAccount] = useContext(accountContext)

  const [NFTs, setNFTs] = useContext(NFTsContext);
  

  const buyItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait();
    // TODO: loadMarketplaceItems();
  };

  // useEffect(() => {



  // }, []);

  return (
    <div>
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

      {
          NFTs['loading'] ? <p>Loading marketplace items...</p> : (
            /* tags */

            /* cards */
            NFTs.map((nft) => (
              <NFTCard
                // key={nft.}
                nft={nft}
                actionText={nft.seller.toLowerCase() != account ? "Buy" : null}
                actionFunc={nft.seller.toLowerCase() != account ? () => buyItem(nft) : null}
              />
            ))
          )
      }
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

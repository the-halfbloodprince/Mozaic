import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import Loading from './AwaitingConnection'
import { HashLoader as LoaderAnim } from 'react-spinners'
import axios from "axios";

import styles from './marketplace.module.css'
import NFTCard from './NFTCard'

const Home = ({ connection, marketplace, nft }) => {

  const [items, setItems] = useState([]);
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount();
    console.log(itemCount.toNumber());
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const token = await marketplace.items(i);
      // console.log(token);
      // console.log(token.tokenId);
      if (token.onSale) {
        const tokenURI = await nft.tokenURI(token.tokenId);
        // console.log(tokenURI);
        let url = tokenURI.split("//");
        // console.log(url[1]);
        let axiosURL = "https://ipfs.io/ipfs/" + url[1];
        // console.log(axiosURL);
        let meta = await axios.get(axiosURL);
        let metadata = meta.data;
        console.log(metadata);

        let imageURL = "https://ipfs.io/ipfs/" + metadata.image.split("//")[1];
        
        let item = {
          itemId: token.itemId,
          name: metadata.name,
          description: metadata.description,
          image: imageURL,
          price : token.price,
          onSale:token.onSale
        };
        items.push(item);
      }
    }
   
    setItems(items);
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  const MarketPlaceMain = () => {
    return <div>
      <div className= {styles.imgSection}>
        <div className= {styles.Card}>
          <div className= {styles.Card__number}>30+</div>
          <div className= {styles.Card__heading}>users</div>
        </div>
        <div className= {styles.Card}>
          <div className= {styles.Card__number}>30+</div>
          <div className= {styles.Card__heading}>users</div>
        </div>
        <div className= {styles.Card}>
          <div className= {styles.Card__number}>30+</div>
          <div className= {styles.Card__heading}>users</div>
        </div>
      </div>

      {/* tags */}

      {/* cards */}
      {
        items.map((nft) => (<NFTCard nft={nft} />))
      }

    </div>
  }

  return connection ? <MarketPlaceMain /> : <Loading loadingText='Connect to Wallet for access' loadingIcon={<LoaderAnim color="#B0F122" />} />
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
    }

export default Home
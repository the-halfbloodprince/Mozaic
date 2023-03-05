import { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Home = ({ marketplace, nft }) => {

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
          price : token.price
        };
        items.push(item);
      }
    }
   
    setItems(items);
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);
  return (
    
    <div>
      <Row xs={1} md={2} lg={4} className="">
        {items.map((item, idx) => (
          <Col key={idx} className="">
            <Card>
              <Card.Img variant="top" src={item.image} />
            
              <h5>{item.name}</h5>
              <h5>{item.price.toString()}</h5>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Home;

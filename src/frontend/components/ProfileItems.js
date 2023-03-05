import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Row, Col, Card} from "react-bootstrap";
import axios from "axios";

const ProfileItems = ({ marketplace, nft, account }) => {
  const [tokens, setTokens] = useState([]);

  const loadTokens = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount();
    // console.log(itemCount.toNumber());
    let myItems = [];
    // let soldItems = [];
    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx);
      //   console.log(i);
      if (i.seller.toLowerCase() === account) {
        // get uri url from nft contract
        const tokenURI = await nft.tokenURI(i.tokenId);
        console.log(tokenURI);
        let url = tokenURI.split("//");
        console.log(url[1]);
        let axiosURL = "https://ipfs.io/ipfs/" + url[1];
        console.log(axiosURL);
        let meta = await axios.get(axiosURL);
        let metadata = meta.data;
        console.log(metadata);

        let imageURL = "https://ipfs.io/ipfs/" + metadata.image.split("//")[1];
       
        let item = {
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: imageURL,
          price:i.price
        };
        myItems.push(item);
        // console.log()
      }
    }
    
    setTokens(myItems);
    // console.log(tokens);
  };
  useEffect(() => {
    loadTokens();
    
  }, []);
 

  const listNFT = async (itemId) => {
    try {
      // const id = await nft.tokenCount();
      const listingPrice = ethers.utils.parseEther("1");
      await (await marketplace.listItem(itemId, listingPrice)).wait();
      alert("Successfully listed your NFT!");
    } catch (e) {
      alert("Upload error" + e);
    }
  };
  return (
    <div>
      <Row xs={1} md={2} lg={4} className="">
        {tokens.map((item, idx) => (
          <Col key={idx} className="">
            <Card>
              <Card.Img variant="top" src={item.image} />
              <div>
                <h5>{item.name}</h5>
                <h5>{item.price.toString()}</h5>
              </div>

              <button onClick={() => listNFT(item.itemId)}> List</button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProfileItems;

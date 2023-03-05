import { useState } from 'react'
import { ethers } from "ethers"
import { create as ipfsHttpClient } from 'ipfs-http-client'
import styles from './Create.module.css'
import React from "react"
import PriceModal from './PriceModal';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !price || !name || !description) return
    try{
      const result = await client.add(JSON.stringify({image, price, name, description}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await(await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }

  //Modal functions
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (price) => {
    console.log(`Price submitted: ${price}`);
    setIsModalOpen(false);
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <label>
          Title of NFT:
          <br/>
          <input className={`${styles.input} ${styles.name}`} type="text" placeholder="Title" required onChange={(e) => setName(e.target.value)}   />
        </label>
        <br/>
        
        
        <label>
          Description:
          <br/>
          <textarea  className={styles.description} type="paragraph" placeholder="Enter more details about the NFT" required onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br/>
        <div>
      <button className={`${styles.buttonPrice} ${styles.price}`} onClick={handleOpenModal}>Enter Price</button>
      <PriceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
    <br/>
        
        <br/>
        <input className={styles.fileinput} type="file" required name="file" onChange={uploadToIPFS}/>
        <br/>
        <div className={styles.createButton}><div onClick={createNFT} className={styles.button}>Submit</div></div>
 
        
        
      </div>
    </div>
  );
}
/*
<Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required as="textarea" placeholder="Description" />
              <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" />
              <div className={styles.button}>
              <Button onClick={console.log("Create NFT clicked")} variant="primary" size="lg">
                Create & List NFT!
              </Button>
              </div>
*/ 
export default Create
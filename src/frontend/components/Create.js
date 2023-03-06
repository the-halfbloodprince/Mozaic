import { useState } from "react";
import { NFTStorage } from "nft.storage";
import styles from './Create.module.css'

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;

const ethers = require("ethers");

const CreateNFT = ({ nft, marketplace }) => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
  });

  let file;
  async function OnChangeFile(e) {
    file = e.target.files[0];
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {
    const { name, description } = formParams;
    //Make sure that none of the fields are empty
    if (!name || !description || !file) return;

    const image = new File([file], file.name);
    const nftJSON = {
      name,
      description,
      image,
    };

    try {
   
      const client = new NFTStorage({ token: API_KEY });
      const metadata = await client.store(nftJSON);

      console.log("NFT data stored!");
      console.log("Metadata URI: ", metadata.url);
      return metadata.url;
    } catch (e) {
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function mintNFT(e) {
    e.preventDefault();

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      console.log(metadataURL);
      await (await nft.mint(metadataURL)).wait();
      // approve marketplace to spend nft
      // await (await nft.setApprovalForAll(marketplace.address, true)).wait();
      const id = await nft.tokenCount();
      await (await nft.approve(marketplace.address, id)).wait();

      
      
      await (await marketplace.makeItem(nft.address, id)).wait();
      alert("Successfully minted your NFT!");
    } catch (e) {
      console.log(e)
      alert("Upload error");
    }
  }

  // console.log("Working", process.env);
  
  return (
    <div className={styles.container}>
        
        {/* name */}
        <div className={styles.name}>
          <p className={styles.name__label}>Name of NFT</p>
          <input 
            className={styles.name__input} 
            type="text" 
            placeholder="name" 
            value={formParams.name} 
            required 
            onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })} 
          />
        </div>
        
        {/* descr */}
        <div className={styles.descr}>
          <p className={styles.descr__label}>Desciption</p>
          <textarea 
            className={styles.descr__input} 
            type="text" 
            placeholder="This is an awesome NFT!" 
            required 
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({ ...formParams, description: e.target.value })
            } 
          />
        </div>
        
        {/* file */}
        <div className={styles.file}>
          <p className={styles.file__label}>Upload file</p>
          <input 
            className={styles.file__input} 
            type="file" 
            required 
            onChange={OnChangeFile}
          />
        </div>

        {/* submit button */}
        <button
          onClick={mintNFT}
        >
          Create NFT
        </button>

    </div>
  );
}
export default CreateNFT
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import styles from "./Create.module.css";
import { Radio } from "@mantine/core";

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;

const ethers = require("ethers");

let file;

const CreateNFT = ({ nft, marketplace }) => {
  
  // form params
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    category: "", 
  });

  // file handler
  function OnChangeFile(e) {
    file = e.target.files[0];
  }

  // category handler
  const [selectedCategory, setSelectedCategory] = useState("");
  function handleOptionChange(val) {
    setSelectedCategory(val);
    updateFormParams({ ...formParams, category: val });
  }

  //This function uploads the metadata to IPFS
  async function uploadMetadataToIPFS() {


    const { name, description ,category} = formParams;
    //Make sure that none of the fields are empty
    if (!file || !name || !description || !category) return ;
    // console.log(category);
   
    const image = new File([file], file.name);
    const nftJSON = {
      name,
      description,
      category,
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
    console.log(formParams)

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      console.log(metadataURL);
      await (await nft.mint(metadataURL)).wait();
      
      const id = await nft.tokenCount();
      await (await nft.approve(marketplace.address, id)).wait();

      await (await marketplace.makeItem(nft.address, id)).wait();
      alert("Successfully minted your NFT!");
    } catch (e) {
      console.log(e);
      alert("Upload error");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2>Create your NFT</h2>
        {/* name */}
        <div className={styles.name}>
          <p className={`${styles.name__label} ${styles.label}`}>Name:</p>
          <input
            className={styles.name__input}
            type="text"
            placeholder="name"
            value={formParams.name}
            required
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
          />
        </div>
        {/* descr */}
        <div className={styles.descr}>
          <p className={`${styles.descr__label} ${styles.label}`}>
            Description
          </p>
          <p className={styles.label__info}>
            The description will be included on the item's detail page
            underneath its image.{" "}
          </p>
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
          <p className={styles.label__info}>
            For Best representation use JPG Format with 2:3 ratio
          </p>
          <input
            className={styles.file__input}
            type="file"
            required
            onChange={OnChangeFile}
            />
        </div>
        <div className={styles.radio}>
          <p className={`${styles.radio__label} ${styles.label}`}>Category:</p>
          <p className={styles.label__info}>
            Choose atleast 2 of the categories which depict your NFT
          </p>
          <Radio.Group
            value={selectedCategory}
            onChange={handleOptionChange}
            name="Category"
            label="Choose your category"
            >
            <Radio
              className={styles.radio__input}
              value="3D Art"
              label="3D Art"
            />
            <Radio
              className={styles.radio__input}
              value="History"
              label="History"
            />
            <Radio
              className={styles.radio__input}
              value="Technology"
              label="Technology"
            />
            <Radio
              className={styles.radio__input}
              value="Aesthetics"
              label="Aesthetics"
            />
          </Radio.Group>
        </div>
        {/* submit button */}
        <div className={styles.center}>
          <button className={styles.createButton} onClick={mintNFT}>
            Create NFT
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateNFT;
           
import { useState } from "react";
import { NFTStorage } from "nft.storage";

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
      await (await nft.setApprovalForAll(marketplace.address, true)).wait();

      const id = await nft.tokenCount();
      
      await (await marketplace.makeItem(nft.address, id)).wait();
      alert("Successfully minted your NFT!");
    } catch (e) {
      alert("Upload error" + e);
    }
  }

  console.log("Working", process.env);
  return (
    <div className="">
      <div className="" id="nftForm">
        <form className="">
          <h3 className="">Upload your NFT to the marketplace</h3>
          <div className="">
            <label className="" htmlFor="name">
              NFT Name
            </label>
            <input
              className=""
              id="name"
              type="text"
              // placeholder="Axie#4563"
              onChange={(e) =>
                updateFormParams({ ...formParams, name: e.target.value })
              }
              value={formParams.name}
            ></input>
          </div>
          <div className="mb-6">
            <label className="" htmlFor="description">
              NFT Description
            </label>
            <textarea
              className=""
              cols="40"
              rows="5"
              id="description"
              type="text"
              // placeholder="Axie Infinity Collection"
              value={formParams.description}
              onChange={(e) =>
                updateFormParams({ ...formParams, description: e.target.value })
              }
            ></textarea>
          </div>
          <div>
            <label className="" htmlFor="image">
              Upload Image
            </label>
            <input type={"file"} onChange={OnChangeFile}></input>
          </div>
          <br></br>
          {/* <div className="">{message}</div> */}
          <button onClick={mintNFT} className="">
            Mint NFT
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;

import { useContext, useState } from "react";
import { NFTStorage } from "nft.storage";
import styles from './Create.module.css'
import { accountContext, needrefreshContext } from "../contexts/contexts";
import Loading from "./AwaitingConnection";
import { HashLoader, PuffLoader, PulseLoader } from "react-spinners";
import { notifications } from '@mantine/notifications';
import { categories } from "../globals/variables";
import { Radio } from "@mantine/core";
import { useNavigate } from 'react-router-dom'
import { Dropzone } from '@mantine/dropzone'
import { MdOutlineImage as ImageIcon } from 'react-icons/md'
import { NoAccount } from "./LoadingComponents";

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;

const ethers = require("ethers");

let file;

const CreateNFT = ({ nft, marketplace }) => {
  

  const [account, setAccount] = useContext(accountContext)

  // console.log("Working", process.env);
  
  return account ? <CreateSignedIn account={account} nft={nft} marketplace={marketplace} /> : <NoAccount />;
}
// export default CreateNFT

function CreateSignedIn({ nft, marketplace, account }) {

    const [uploadedImageURL, setUploadedImageURL] = useState(null)

    const navigate = useNavigate()
    
    const [needRefresh, setNeedRefresh] = useContext(needrefreshContext) 

//     const [formParams, updateFormParams] = useState({
//       name: "",
//       description: "",
//     });

//     let file;
//     async function OnChangeFile(e) {
//       file = e.target.files[0];
//     }

//     //This function uploads the metadata to IPFS
//     async function uploadMetadataToIPFS() {
//       const { name, description } = formParams;
//       //Make sure that none of the fields are empty
//       if (!name || !description || !file) return;

//       const image = new File([file], file.name);
//       const nftJSON = {
//         name,
//         description,
//         image,
//       };

//       try {
    
//         const client = new NFTStorage({ token: API_KEY });
//         const metadata = await client.store(nftJSON);

//         console.log("NFT data stored!");
//         console.log("Metadata URI: ", metadata.url);
//         return metadata.url;
//       } catch (e) {
//         console.log("error uploading JSON metadata:", e);
//       }
//     }

//     async function mintNFT(e) {
//       e.preventDefault();

//       //Upload data to IPFS
//       try {
//         const metadataURL = await uploadMetadataToIPFS();
//         console.log(metadataURL);
//         await (await nft.mint(metadataURL)).wait();
//         // approve marketplace to spend nft
//         // await (await nft.setApprovalForAll(marketplace.address, true)).wait();
//         const id = await nft.tokenCount();
//         await (await nft.approve(marketplace.address, id)).wait();

        
        
//         await (await marketplace.makeItem(nft.address, id)).wait();
//         setNeedRefresh(true)
//         // alert("Successfully minted your NFT!");
//         notifications.show({
//           title: 'NFT Minted',
//           message: 'Successfully minted your NFT!'
//         })
//       } catch (e) {
//         console.log(e)
//         alert("Upload error");
//       }
//     }

//     return (
//       <div className={styles.container}>
          
//           {/* name */}
//           <div className={styles.name}>
//             <p className={styles.name__label}>Name of NFT</p>
//             <input 
//               className={styles.name__input} 
//               type="text" 
//               placeholder="name" 
//               value={formParams.name} 
//               required 
//               onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })} 
//             />
//           </div>
          
//           {/* descr */}
//           <div className={styles.descr}>
//             <p className={styles.descr__label}>Desciption</p>
//             <textarea 
//               className={styles.descr__input} 
//               type="text" 
//               placeholder="This is an awesome NFT!" 
//               required 
//               value={formParams.description}
//               onChange={(e) =>
//                 updateFormParams({ ...formParams, description: e.target.value })
//               } 
//             />
//           </div>
          
//           {/* file */}
//           <div className={styles.file}>
//             <p className={styles.file__label}>Upload file</p>
//             <input 
//               className={styles.file__input} 
//               type="file" 
//               required 
//               onChange={OnChangeFile}
//             />
//           </div>
  
//           {/* submit button */}
//           <button
//             onClick={mintNFT}
//           >
//             Create NFT
//           </button>
  
//       </div>
//     )
// }

  const [loading, setLoading] = useState(false)

  // form params
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    category: "", 
  });

  // file handler
  // function OnChangeFile(e) {
  //   file = e.target.files[0];
  // }
  function OnChangeFile(newfiles) {
    file = newfiles[0];
    console.log('file recieved')
    console.log(file)
    setUploadedImageURL(URL.createObjectURL(file))
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

      // notifications.show({
      //   withCloseButton: true,
      //   loading: false,
      //   color: 'lime',
      //   title: 'NFT Data stored',
      //   message: 'NFT Data stored'
      // })
      console.log("NFT Data Stored");
      console.log("Metadata URI: ", metadata.url);
      return metadata.url;
    } catch (e) {
      notifications.show({
        color: 'red',
        title: 'error uploading JSON metadata',
        message: e
      })
      console.log("error uploading JSON metadata:", e);
    }
  }

  async function mintNFT(e) {
    e.preventDefault();
    setLoading(true)
    console.log(formParams)

    notifications.show({
      withCloseButton: true,
      loading: true,
      color: 'lime',
      title: 'Creating your NFT!',
      message: 'Creating your NFT!'
    })

    //Upload data to IPFS
    try {
      const metadataURL = await uploadMetadataToIPFS();
      console.log(metadataURL);
      await (await nft.mint(metadataURL)).wait();
      
      const id = await nft.tokenCount();
      
      await (await nft.approve(marketplace.address, id)).wait();

      await (await marketplace.makeItem(nft.address, id)).wait();
      setNeedRefresh(true)
      setLoading(false)
      setTimeout(() => navigate(`/profile/${account}`), 3000)
//         // alert("Successfully minted your NFT!");
      notifications.show({
        withCloseButton: true,
        loading: false,
        color: 'lime',
        title: 'NFT Minted',
        message: 'Successfully minted your NFT. You will be redirected to your profile page in 3 seconds'
      })
    } catch (e) {
      navigate('/something-went-wrong')
      // e.preventDefault()
      console.log(e);
      // // alert("Upload error");
      // notifications.show({
      //   withCloseButton: true,
      //   loading: false,
      //   color: 'lime',
      //   title: 'Upload error',
      //   message: e
      // })
      // setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <h2 className={styles.page_title}>Create your NFT</h2>
        {/* name */}
        <div className={styles.name}>
          <p className={`${styles.name__label} ${styles.label}`}>Name</p>
          <input
            className={styles.name__input}
            type="text"
            placeholder="Anything cool works!"
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
        <div className={styles.row3}>
              
              <div className={styles.upload}>
                  <p className={styles.file__label}>Upload file</p>
                  <p className={styles.label__info}>
                    For Best representation use JPG Format with 2:3 ratio
                  </p>
                  <div className={styles.uploadFileSection}>
                    <Dropzone style={{ background: `url(${uploadedImageURL})` }} className={styles.dropzone} onDrop={OnChangeFile}>
                        <div className={styles.dropzone__main}>
                            <ImageIcon className={styles.dropzone__icon} />
                            <div className={styles.dropzone__text}>
                                <p className={styles.dropzone__line1}>Drag images here or click to upload</p>
                                {/* <p>Drag images here or click to upload</p> */}
                            </div>
                        </div>
                    </Dropzone>
                    {/* {
                        hasFile && (
                            <img src={URL.createObjectURL(file)} alt="" />
                        )
                    } */}
                    {/* <div className={styles.file}>
                      <input
                        className={styles.file__input}
                        type="file"
                        required
                        onChange={OnChangeFile}
                        />
                    </div> */}
                </div>
              </div>
                    
              <div className={styles.radio}>
                <p className={`${styles.radio__label} ${styles.label}`}>Category</p>
                <p className={styles.label__info}>
                  Choose any 1 of the categories which depict your NFT the best
                </p>
                <Radio.Group
                  value={selectedCategory}
                  onChange={handleOptionChange}
                  name="Category"
                  >
                  {
                      categories.map(categ => (
                        <Radio
                          className = { `${styles.radio__input} ${(categ === selectedCategory) && 'activeRadio'}` }
                          value = { categ }
                          label = { categ }
                        />
                      ))
                  }
                </Radio.Group>
              </div>
        </div>
        {/* submit button */}
        <div className={styles.center}>
          <button className={styles.createButton} onClick={mintNFT} disabled={loading}>
            <p>{ loading && <PulseLoader size={10} className={styles.loadingIcon} /> }</p>
            <p>{ loading ? 'Creating NFT' : 'Create NFT'}</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateNFT;
           

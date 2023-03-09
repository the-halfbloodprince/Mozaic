import { useContext, useState } from "react";
import { NFTStorage } from "nft.storage";
import { accountContext, needrefreshContext } from "../contexts/contexts";
import Loading from "./AwaitingConnection";
import { HashLoader, PuffLoader, PulseLoader } from "react-spinners";
import { notifications } from '@mantine/notifications';
import { categories } from "../globals/variables";
import { Radio } from "@mantine/core";
import { useNavigate } from 'react-router-dom'

import styles from './CreatePage2.module.css'

// const API_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;

let file;

const CreatePage = () => {

  const navigate = useNavigate()
    
    const [needRefresh, setNeedRefresh] = useContext(needrefreshContext) 


  const [loading, setLoading] = useState(false)

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

  const [selectedCategory, setSelectedCategory] = useState("");
  
  function handleOptionChange(val) {
    setSelectedCategory(val);
    updateFormParams({ ...formParams, category: val });
  }

  return (
    <div className={styles.container}>
        <div className={styles.main}>
            <div className={styles.image}>
            
            </div>
            <div className={styles.form}>
                <input value="Sexy Sagar" type="text" className={styles.title} />
                <textarea value="lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem " type="text" className={styles.description} />
                {/* <div className={styles.priceBox}><input type="number" className={styles.price} /> <p> ETH</p></div> */}
                <Radio.Group
                value={selectedCategory}
                onChange={handleOptionChange}
                name="Category"
                >
                {
                    categories.map(categ => (
                      <Radio
                        className = { styles.radio__input }
                        value = { categ }
                        label = { categ }
                      />
                    ))
                }
                </Radio.Group>
            </div>
        </div>
    </div>
  )
}

export default CreatePage
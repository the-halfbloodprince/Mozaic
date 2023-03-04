
import styles from './createnft.module.css'
import React from "react"

function createnft () {
    return(
    <div className={styles.container}>
      <div className={styles.container} >
        <form className={styles.container}>
          <h3 className={styles.container}>Upload your NFT to the marketplace</h3>
          <div className={styles.container}>
            <label className={styles.container} >
              NFT Name
            </label>
            <input
              className={styles.container}
              id="name"
              type="text"
              placeholder="Axie#4563"
              onChange={() =>
                console.log("Something HAPPENED")
              }
              value="Ojay Orochimaru"
            ></input>
          </div>
          <div>
            <label className={styles.container}>
              NFT Description
            </label>
            <textarea
              className={styles.container}
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Axie Infinity Collection"
              
              onChange={() =>
                console.log("Something written in textarea")
              }
            ></textarea>
          </div>
          <div>
            <label className={styles.container} htmlFor="image">
              Upload Image
            </label>
            <input type={"file"} onChange={console.log("Inut changed part 3")}></input>
          </div>
          <br></br>
          
          <button onClick={console.log("Mint NFT is called")} className={styles.container}>
            List NFT
          </button>
        </form>
      </div>
    </div>
    )
}

export default createnft
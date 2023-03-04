import React from 'react'
import styles from "./Footer.module.css"

function Footer() {
  return (
    <div className={styles.Footer}>
      <div className={styles.Name}>
        MOZAIC
      </div>
      <div className={styles.Copyright}>
        © 2023 Moziac UI Kit. All rights reserved
      </div>
    </div>
  )
}

export default Footer
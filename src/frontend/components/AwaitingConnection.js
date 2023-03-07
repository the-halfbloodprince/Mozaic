import React from 'react'
import styles from './AwaitingConnection.module.css'

const Loading = ({ loadingText = 'Awaiting Connection', loadingIcon }) => {
    return (
      <div className={styles.awaitingconnection__main}>
        <div className={styles.awaitingconnection__message}>
          {loadingIcon && loadingIcon}
          <p>{loadingText}</p>
        </div>
      </div>
    )
}

export default Loading
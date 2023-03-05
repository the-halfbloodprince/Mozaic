import React from 'react'
import styles from './PriceModal.module.css'

const PriceModal = ({ isOpen, onClose, onSubmit }) => {
  const [price, setPrice] = React.useState('');

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  function handleSubmit() {
    // e.preventDefault();
    console.log("Varade");
    onSubmit(price);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        {/* <form onSubmit={handleSubmit}> */}
          <div className={styles.heading}>Price in ETH</div>
          {/* <label className={styles.label} htmlFor="price"> </label> */}
          <input
            type="number"
            id="price"
            step="0.001" 
            required
            value={price}
            onChange={handlePriceChange}
          />
          <button className={styles.button} onClick={handleSubmit}>Submit</button>
          <button className={styles.button} type="button" onClick={onClose}>Cancel</button>
        {/* </form> */}
      </div>
    </div>
  );
};

/*
<label>
          Price:
          <br/>
          <div className={styles.priceSection} >
          <input  className={styles.price} type="number" step="0.001" required onChange={console.log("Price  is not needed here")} />
          <div className={styles.priceUnit}>ETH</div>
          </div>
        
        </label>
*/

export default PriceModal;

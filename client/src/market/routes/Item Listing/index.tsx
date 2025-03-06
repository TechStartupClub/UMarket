import React from 'react'
import styles from './index.module.css'

const ItemListingPage: React.FC = () => {
  return (

    // Container
    <div className={styles.container}>
      // Main content container
      <div className={styles.mainContent}>

        // Left Section: Item Image
        <div className={styles.imageSection}>
          <div className={styles.itemImage}>Item Image</div>
        </div>

        // Right Section: Item Details
        <div className={styles.detailsSection}>
          <div className={styles.titleSection}>
            <h2>Item Title</h2>
          </div>
          <div className={styles.sellerProfile}>
            <div className={styles.sellerProfilePic}>Seller Image</div>
            <span>Seller Username</span>
          </div>
          <div className={styles.priceAndCondition}>
            <div className={styles.price}>$999</div>
            <div className={styles.condition}>
              <span>Condition: </span>
              <span>New</span>
            </div>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.buyButton}>Buy now</button>
            <button className={styles.cartButton}>Add To Cart</button>
            <button className={styles.wishlistButton}>Add To Wishlist</button>
          </div>
          <div className={styles.additionalInfo}>
            <p>Delivery: Pickup</p>
            <p>Returns: Sellers does not accept returns</p>
            <p>Payment: Cash</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ItemListingPage;
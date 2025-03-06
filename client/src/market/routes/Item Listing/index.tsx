import React from 'react'
import styles from './index.module.css'

const ItemListingPage: React.FC = () => {
  
  return (
		<>
			{/* Container */}
			<div className={styles.container}>
				{/* Route Links (Back to homepage) */}
				<div className={styles.routeLinks}>
					<p>
						Back to home page &bull;&nbsp; 
						<span className={styles.routeLinksPart}>School Materials &gt;&nbsp;</span>
						<span className={styles.routeLinksPart}>Bags</span>
						<span className={styles.routeLinksShare}>Share</span>
					</p>
				</div>

	
				{/* Main content container */}
				<div className={styles.mainContent}>
					{/* Left Section: Item Image */}
					<div className={styles.imageSection}>
						<div className={styles.itemImage}>Item Image</div>
					</div>
	
					{/* Right Section: Item Details */}
					<div className={styles.detailsSection}>
						<div className={styles.titleSection}>
							<h2>Item Title</h2>
						</div>
						<div className={styles.sellerProfile}>
							<div className={styles.sellerProfilePic}></div>
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
							<p>
								<span className={styles.infoLabel}>Delivery:</span>
								<span className={styles.infoValue}>Pickup</span>
							</p>
							<p>
								<span className={styles.infoLabel}>Returns:</span>
								<span className={styles.infoValue}>Seller does not accept returns</span>
							</p>
							<p>
								<span className={styles.infoLabel}>Payment:</span>
								<span className={styles.infoValue}>Cash</span>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);	
}

export default ItemListingPage;
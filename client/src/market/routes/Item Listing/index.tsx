import React from 'react'
import styles from './index.module.css'


const itemDetailsBox = {
	condition: 'New',
	brand: 'Nike',
	color: 'Red',
	features: 'Lightweight, Waterproof'
};

const ItemListingPage: React.FC = () => {
  return (
		<>
			{/* Container */}
			<div className={styles.container}>
				{/* Route Links (Back to homepage) */}
				<div className={styles.routeLinks}>
					<p>
						<span className={styles.routeLinksHome}>Back to home page</span>
						<span>&nbsp;&bull;&nbsp;</span>
						<span className={styles.routeLinksPart}>School Materials &gt;&nbsp;</span>
						<span className={styles.routeLinksPart}>Bags</span>
						<span className={styles.routeLinksShare}>Share</span>
					</p>
				</div>
	
				{/* Main content container */}
				<div className={styles.mainContentContainer}>
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

				{/* Item Specifics Information Div */}
				<div className={styles.specificsContainer}>
					<div className={styles.innerSpecificsContainer}>
						<h4>About this item</h4>
						<h2>item Specifics</h2>
						<div className={styles.itemRow}>
							<div className={styles.itemLabel}>Condition</div>
							<div className={styles.itemValue}>{itemDetailsBox.condition}</div>
						</div>
						<div className={styles.itemRow}>
							<div className={styles.itemLabel}>Brand</div>
							<div className={styles.itemValue}>{itemDetailsBox.brand}</div>
						</div>
						<div className={styles.itemRow}>
							<div className={styles.itemLabel}>Color</div>
							<div className={styles.itemValue}>{itemDetailsBox.color}</div>
						</div>
						<div className={styles.itemRow}>
							<div className={styles.itemLabel}>Features</div>
							<div className={styles.itemValue}>{itemDetailsBox.features}</div>
						</div>
						<div className={styles.itemDescription}>
							<h2>Item Description From Seller</h2>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque aut, adipisci
								incidunt nam rem necessitatibus eveniet aperiam commodi, laboriosam esse et voluptatem
								aliquam consequuntur deleniti dignissimos perferendis totam nisi, non doloribus ipsa
								cupiditate? Quo quae quod aspernatur quisquam? Incidunt est accusantium, sint dicta
								necessitatibus reprehenderit perferendis pariatur officia ab explicabo.
							</p>
						</div>
					</div>
				</div>

			</div>
		</>
	);	
}

export default ItemListingPage;
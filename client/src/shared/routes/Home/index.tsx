import React from 'react';
import styles from './home.module.css';

const HomePage = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    }

    // Based on your interests items
    const interestItems = [
        {
            id: 1,
            name: 'Lockheed Martin F-22 Raptor',
            price: 350000000,
            image: '/images/f22-raptor.jpg',
        },
        {
            id: 2,
            name: 'UGM-27 Polaris (Poster)',
            price: 2,
            image: '/images/ugm-polaris.jpg',
        },
        {
            id: 3,
            name: 'M1 Abrams (Used)',
            price: 4300000,
            bids: 1435,
            timeLeft: '1d 12h left',
            image: '/images/m1-abrams.jpg',
        }
    ];

    // Recently posted items
    const recentlyPosted = [
        {
            id: 4,
            name: 'Nintendo DS Silver',
            price: 30,
            image: '/images/nintendo-ds.jpg',
        },
        {
            id: 5,
            name: 'Pile of Leaves',
            price: 0,
            isFree: true,
            image: '/images/pile-leaves.jpg',
        },
        {
            id: 6,
            name: 'Chicken Strip (Used)',
            price: 0,
            isFree: true,
            image: '/images/chicken-strip.jpg',
        },
        {
            id: 7,
            name: 'Toad',
            price: 999,
            image: '/images/toad.jpg',
        },
        {
            id: 8,
            name: 'Louis Vuitton Bag',
            price: 2400,
            image: '/images/louis-vuitton.jpg',
        }
    ];

    const recentlyViewed = [
        {
            id: 9,
            name: 'Schoolbrand Backpack',
            price: 30,
            image: '/images/backpack.jpg',
        },
        {
            id: 10,
            name: 'Carhartt Jacket',
            price: 20,
            image: '/images/jacket.jpg',
        },
        {
            id: 11,
            name: 'Extra Notebooks & Pencils',
            price: 7.00,
            bids: 15,
            timeLeft: '2d 14h left',
            image: '/images/notebooks.jpg',
        }
    ];

    // Function to format price
    const formatPrice = (price) => {
        if (price >= 1000000) {
            return `$${(price / 1000000).toFixed(1)}M`;
        } else {
            return `$${price}`;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <h1 className={styles.title}>The marketplace built for students,<br />by students.</h1>
                <button className={styles.shopButton}>Browse our shop</button>
            </div>

            {/* Based on your interests section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Based on your interests</h2>
                    <a href="/shop" className={styles.shopAll}>Shop all</a>
                </div>
                <div className={styles.productGrid}>
                    {interestItems.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className={styles.productInfo}>
                                <h3>{product.name}</h3>
                                <p className={styles.price}>{formatPrice(product.price)}</p>
                                {product.bids && (
                                    <p className={styles.bidInfo}>
                                        {product.bids} Bids • {product.timeLeft}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recently Posted section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Recently Posted</h2>
                    <a href="/shop" className={styles.shopAll}>Shop all</a>
                </div>
                <div className={styles.productGrid}>
                    {recentlyPosted.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className={styles.productInfo}>
                                <h3>{product.name}</h3>
                                {product.isFree ? (
                                    <p className={styles.price}>FREE</p>
                                ) : (
                                    <p className={styles.price}>{formatPrice(product.price)}</p>
                                )}
                                {product.bids && (
                                    <p className={styles.bidInfo}>
                                        {product.bids} Bids • {product.timeLeft}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recently Viewed section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>Recently Viewed</h2>
                    <a href="/shop" className={styles.shopAll}>Shop all</a>
                </div>
                <div className={styles.productGrid}>
                    {recentlyViewed.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className={styles.productInfo}>
                                <h3>{product.name}</h3>
                                <p className={styles.price}>${product.price}</p>
                                {product.bids && (
                                    <p className={styles.bidInfo}>
                                        {product.bids} Bids • {product.timeLeft}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.viewAllContainer}>
                <button className={styles.viewAllButton}>View all Listings</button>
            </div>
        </div>
    );
};

export default HomePage;
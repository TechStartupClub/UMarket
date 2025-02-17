// src/shared/components/home/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

<<<<<<< Updated upstream
const HomePage: React.FC = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to UMarket</h1>
            {/* test button to trigger Google OAuth */}
            <button className={styles.loginButton} onClick={handleLogin}>
                Login with Google
            </button>
=======
interface Product {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  timeLeft?: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  showAll?: boolean;
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products, showAll = true }) => (
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <h2>{title}</h2>
      {showAll && (
        <Link to="/shop" className={styles.shopAll}>
          Shop all
        </Link>
      )}
    </div>
    <div className={styles.productGrid}>
      {products.map((product) => (
        <Link to={`/product/${product.id}`} className={styles.card}>
        <img
          src={product.imageUrl}
          alt={product.title}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <h3>{product.title}</h3>
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price}</span>
            {product.timeLeft && (
              <span className={styles.timeLeft}>{product.timeLeft}</span>
            )}
          </div>
>>>>>>> Stashed changes
        </div>
      </Link>
      ))}
    </div>
  </div>
);

const Home: React.FC = () => {
  const recentlyViewed: Product[] = [
    {
      id: 1,
      title: "Schoolbrand Backpack",
      price: 30,
      imageUrl: "/src/assets/images/items/backpack.PNG"
    },
    {
      id: 2,
      title: "Carhartt Jacket",
      price: 20,
      imageUrl: "/src/assets/images/items/jacket.PNG"
    },
    {
      id: 3,
      title: "Extra Notebooks & Pencils",
      price: 700,
      imageUrl: "/src/assets/images/items/noetbook.jpg",
      timeLeft: "2d 14h left"
    }
  ];

  const basedOnInterests: Product[] = [
    {
      id: 4,
      title: "Lockheed Martin F-22 Raptor",
      price: 350000,
      imageUrl: "/src/assets/images/items/f22.PNG"
    },
    {
      id: 5,
      title: "UGM-27 Polaris (Poster)",
      price: 2,
      imageUrl: "/src/assets/images/items/rocket.PNG"
    }
  ];

  const recentlyPosted: Product[] = [
    {
      id: 6,
      title: "Nintendo DS Silver",
      price: 45,
      imageUrl: "/src/assets/images/items/ds.jpg"
    },
    {
      id: 7,
      title: "Pile of Leaves",
      price: 0,
      imageUrl: "/src/assets/images/items/leaves.jpg"
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1>
          The marketplace built for students,
          <br />
          by students.
        </h1>
        <Link to="/shop" className={styles.browseButton}>
          Browse our shop
        </Link>
      </div>

      <ProductSection title="Recently Viewed" products={recentlyViewed} />
      <ProductSection title="Based on your interests" products={basedOnInterests} />
      <ProductSection title="Recently Posted" products={recentlyPosted} />

      <div className={styles.viewAll}>
        <Link to="/shop" className={styles.viewAllButton}>
          View all Listings
        </Link>
      </div>
    </div>
  );
};

export default Home;
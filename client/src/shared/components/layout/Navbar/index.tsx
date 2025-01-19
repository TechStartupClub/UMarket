import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    UMarket
                </Link>
                <div className={styles.links}>
                    <Link to="/market">Marketplace</Link>
                    <Link to="/social">Social</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
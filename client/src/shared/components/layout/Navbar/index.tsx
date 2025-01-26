import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoLocationOutline } from "react-icons/io5";

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    UMarket
                </Link>
                <input placeholder="Search The Market" className={styles.input} type="text" />
                <div className={styles.search}>
                    <Link to="/social">Search</Link>
                </div>
                <div className={styles.links}>
                    <Link to="/profile"><IoLocationOutline size={30} /> Tacoma Campus</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Topbar.module.css';
import { HiShoppingCart } from 'react-icons/hi';

const Topbar: React.FC = () => {
    return (
        <div className={styles.topbar}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <Link to="/profile"><span>Hello {'<insert username>'}!</span></Link>
                    <Link to="/help"><span>Help & Contact</span></Link>
                    <Link to="/about"><span>About</span></Link>
                </div>
                <div className={styles.right}>
                    <Link to="/sell"><span>Sell</span></Link>
                    <Link to="/watchlist"><span>Watchlist</span></Link>
                    <Link to="/profile"><span>My Profile</span></Link>
                    <Link to="/inbox"><span>Inbox</span></Link>
                    <Link to="/cart"><span>Cart <HiShoppingCart size={16} /></span></Link>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
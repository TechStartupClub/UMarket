import React from 'react';
import styles from './Topbar.module.css';

const Topbar: React.FC = () => {
    return (
        <div className={styles.topbar}>
            <div className={styles.content}>
                <div className={styles.left}>
                <span>Hello {'<insert username>'}! </span>
                <span>Help & Contact</span>
                <span>About</span>
                </div>
                <div className={styles.right}>
                    <span>Sell</span>
                    <span>Watchlist</span>
                    <span>My Profile</span>
                    <span>Inbox</span>
                    <span>Cart 🛒</span>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
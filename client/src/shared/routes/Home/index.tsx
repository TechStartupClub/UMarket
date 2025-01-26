import React from 'react';
import styles from './home.module.css';

const HomePage: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to UMarket</h1>
        </div>
    );
};

export default HomePage;
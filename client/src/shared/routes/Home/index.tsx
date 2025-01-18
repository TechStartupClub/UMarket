// src/market/pages/HomePage/index.tsx
import React from 'react';
import PageLayout from '../../components/layout/PageLayout';
import styles from './home.module.css';

const HomePage: React.FC = () => {
    return (
        <PageLayout>
            <div className={styles.container}>
                <h1 className={styles.title}>Welcome to UMarket</h1>
            </div>
        </PageLayout>
    );
};

export default HomePage;
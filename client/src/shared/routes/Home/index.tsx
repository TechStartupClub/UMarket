import React from 'react';
import styles from './home.module.css';

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
        </div>
    );
};

export default HomePage;
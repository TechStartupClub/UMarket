import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';
import logo from '../../../../assets/logos/tsc/Tech_Startup_Club_Logo.png';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
            <div className={styles.mainContent}>
                <img src={logo} alt="Tech Startup Club Logo" className={styles.logo} />
                <div className={styles.linkGroup}>
                    <p className={styles.createdBy}>CREATED BY TECH STARTUP CLUB</p>
                    <div className={styles.links}>
                        <Link to="/about">ABOUT US</Link>
                        <Link to="/people">PEOPLE</Link>
                        <Link to="/contact">CONTACT</Link>
                    </div>
                </div>
            </div>
                <div className={styles.legalSection}>
                    <span>&copy; 2025 Tech Startup Club</span>
                    <div className={styles.legalLinks}>
                        <Link to="/terms">Terms of Service</Link>
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/accessibility">Accessibility Statement</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
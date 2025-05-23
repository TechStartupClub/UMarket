import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Topbar from '../Topbar';
import styles from './pagelayout.module.css';

interface PageLayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
    children, 
    showFooter = true 
}) => {
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.topbar}>
                <Topbar />
            </div>
            <div className={styles.navbar}>
                <Navbar />
            </div>
            <main className={styles.mainContent}>
                {children}
            </main>
            {showFooter && <Footer />}
        </div>
    );
};

export default PageLayout;
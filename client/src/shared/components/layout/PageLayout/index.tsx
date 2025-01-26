import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Topbar from '../Topbar';
import styles from './PageLayout.module.css';

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
            <Topbar />
            <Navbar />
            {children}
            {showFooter && <Footer />}
        </div>
    );
};

export default PageLayout;
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import styles from './burgermenu.module.css';

interface BurgerMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    onLinkClick?: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ 
    isOpen, 
    onToggle,
    onLinkClick 
}) => {
    return (
        <>
            <button 
                className={styles.burgerButton}
                onClick={onToggle}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && (
                <div className={styles.menu}>
                    <div className={styles.menuButtons}>
                        <Link 
                            to="/sell" 
                            className={styles.menuButton}
                            onClick={onLinkClick}
                        >
                            Sell
                        </Link>
                        <Link 
                            to="/signup" 
                            className={styles.menuButton}
                            onClick={onLinkClick}
                        >
                            Sign Up
                        </Link>
                        <Link 
                            to="/login" 
                            className={styles.menuButton}
                            onClick={onLinkClick}
                        >
                            Login
                        </Link>
                    </div>

                    <div className={styles.menuFooter}>
                        <div className={styles.footerLinks}>
                            <Link 
                                to="/about"
                                onClick={onLinkClick}
                            >
                                About
                            </Link>
                            <Link 
                                to="/help"
                                onClick={onLinkClick}
                            >
                                Help & Contact
                            </Link>
                            <Link 
                                to="/settings"
                                onClick={onLinkClick}
                            >
                                Settings & Accessibility
                            </Link>
                        </div>
                        <div className={styles.copyright}>
                            © 2024 Tech Startup Club
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BurgerMenu;
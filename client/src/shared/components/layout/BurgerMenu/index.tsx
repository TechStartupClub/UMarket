import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { IoLocationOutline } from "react-icons/io5";
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
                    <div className={styles.links}>
                        <Link to="/location" onClick={onLinkClick}>
                            <IoLocationOutline size={30} /> Tacoma Campus
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default BurgerMenu;
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronRight, ChevronDown, Heart, Mail, Bookmark, User } from 'lucide-react';
import styles from './Burgermenu.module.css';

interface BurgerMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    onLinkClick?: () => void;
}

const isPathActive = (path: string) => {
    if (path === '/') {
        return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
};

const BurgerMenu: React.FC<BurgerMenuProps> = ({ 
    isOpen, 
    onToggle,
    onLinkClick 
}) => {
    const [selectedCampus, setSelectedCampus] = useState<string>('Tacoma');
    const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    
    const campusOptions = ['Tacoma', 'Seattle', 'Bothell'];
    
    // Close dropdown when burger menu is closed
    useEffect(() => {
        if (!isOpen) {
            setIsLocationDropdownOpen(false);
        }
    }, [isOpen]);
    
    // Handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                isLocationDropdownOpen
            ) {
                setIsLocationDropdownOpen(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLocationDropdownOpen]);
    
    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };
    
    const handleCampusSelect = (campus: string) => {
        setSelectedCampus(campus);
        setIsLocationDropdownOpen(false);
        if (onLinkClick) onLinkClick();
    };

    return (
        <>
            <button 
                className={styles.burgerButton}
                onClick={onToggle}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>

            {isOpen && (
                <div className={styles.menu}>
                    {/* User Greeting */}
                    <Link 
                        to="/profile" 
                        className={styles.userGreeting}
                        onClick={onLinkClick}
                    >
                        <div className={styles.userAvatar}>
                            <User size={20} strokeWidth={2} />
                        </div>
                        <span className={styles.userName}>Hi, Jide</span>
                        <ChevronRight size={20} className={styles.profileChevron} />
                    </Link>

                    {/* Main Action Buttons */}
                    <div className={styles.menuButtons}>
                        <Link 
                            to="/sell" 
                            className={styles.menuButton}
                            onClick={onLinkClick}
                        >
                            Sell
                        </Link>
                        <button 
                            className={styles.googleButton}
                            onClick={() => {
                                handleLogin();
                                if (onLinkClick) onLinkClick();
                            }}
                        >
                            <svg viewBox="0 0 24 24" className={styles.googleIcon}>
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    {/* Location Dropdown */}
                    <div className={styles.locationDropdownContainer} ref={dropdownRef}>
                        <button 
                            className={styles.locationLink}
                            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                        >
                            <span>{selectedCampus} Campus</span>
                            <ChevronDown 
                                size={24} 
                                className={`${styles.arrowIcon} ${isLocationDropdownOpen ? styles.arrowRotated : ''}`} 
                            />
                        </button>
                        
                        {isLocationDropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {campusOptions
                                    .filter(campus => campus !== selectedCampus)
                                    .map(campus => (
                                        <button
                                            key={campus}
                                            className={styles.dropdownItem}
                                            onClick={() => handleCampusSelect(campus)}
                                        >
                                            {campus} Campus
                                        </button>
                                    ))
                                }
                            </div>
                        )}
                    </div>

                    {/* Service links with east-facing arrows */}
                    <Link to="/social" 
                          className={styles.serviceLink}
                          onClick={onLinkClick}>
                        <span>Social Feed</span>
                        <ChevronRight size={24} className={styles.arrowIcon} />
                    </Link>

                    <Link to="/marketplace" 
                          className={styles.serviceLink}
                          onClick={onLinkClick}>
                        <span>Marketplace</span>
                        <ChevronRight size={24} className={styles.arrowIcon} />
                    </Link>

                    {/* Middle Links - new section */}
                    <div className={styles.middleLinks}>
                        <Link 
                            to="/messages"
                            className={`${styles.middleLink} ${isPathActive('/messages') ? styles.active : ''}`} 
                            onClick={onLinkClick}
                        >
                            <Mail size={20} strokeWidth={2} />
                            <span>Messages</span>
                        </Link>
                        <Link 
                            to="/favorites"
                            className={`${styles.middleLink} ${isPathActive('/favorites') ? styles.active : ''}`} 
                            onClick={onLinkClick}
                        >
                            <Heart size={20} strokeWidth={2} />
                            <span>Favorites</span>
                        </Link>
                        <Link 
                            to="/watchlist"
                            className={`${styles.middleLink} ${isPathActive('/watchlist') ? styles.active : ''}`} 
                            onClick={onLinkClick}
                        >
                            <Bookmark size={20} strokeWidth={2} />
                            <span>Watchlist</span>
                        </Link>
                    </div>

                    {/* Footer Links */}
                    <div className={styles.menuFooter}>
                        <div className={styles.footerLinks}>
                            <Link 
                                to="/about"
                                onClick={onLinkClick}
                            >
                                About
                            </Link>
                            <Link 
                                to="/contact"
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
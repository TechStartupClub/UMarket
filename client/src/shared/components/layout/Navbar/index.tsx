import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
// Removed location icon import
import { User, Search, Bookmark } from 'lucide-react';
import BurgerMenu from '../BurgerMenu';

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        const handleResize = () => {
            if (window.innerWidth > 960 && isSearchOpen) {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isSearchOpen]);

    // Close search when location changes
    useEffect(() => {
        setIsSearchOpen(false);
    }, [location]);

    // Handle clicks outside the search bar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/market?search=${encodeURIComponent(searchQuery.trim())}`);
        }
        setIsMenuOpen(false);
        setIsSearchOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            setIsSearchOpen(false);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    const toggleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent the default action (like form submission)
        e.preventDefault();
        e.stopPropagation();
        
        // Always toggle isSearchOpen regardless of current state
        setIsSearchOpen(!isSearchOpen);
        
        if (!isSearchOpen) {
            // Only close menu if we're opening search
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link to="/" className={styles.logo}>
                    UMarket
                </Link>

                {/* Desktop Menu */}
                {!isSearchOpen && (
                    <div className={styles.desktopMenu}>
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <input 
                                placeholder="Search The Market" 
                                className={styles.input} 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                        <div className={styles.search}>
                            <Link to="/sell">
                                Sell
                            </Link>
                        </div>
                    </div>
                )}

                {/* Mobile Search Bar - Render inline when open */}
                {isSearchOpen ? (
                    <div className={styles.mobileSearchInline} ref={searchRef}>
                        <form onSubmit={handleSearch} className={styles.searchFormMobile}>
                            <input 
                                placeholder="Search The Market" 
                                className={styles.input} 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                        </form>
                    </div>
                ) : null}

                {/* Mobile Icons */}
                <div className={styles.mobileIcons}>
                    <button 
                        className={`${styles.iconButton} ${isSearchOpen ? styles.active : ''}`}
                        onClick={(e) => toggleSearch(e)}
                        aria-label="Toggle search"
                    >
                        <Search size={24} />
                    </button>
                    <Link to="/profile" className={styles.iconButton}>
                        <User size={24} />
                    </Link>
                    <Link to="/watchlist" className={styles.iconButton}>
                        <Bookmark size={24} />
                    </Link>
                    <BurgerMenu 
                        isOpen={isMenuOpen}
                        onToggle={toggleMenu}
                        onLinkClick={() => setIsMenuOpen(false)}
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { User, Search, Bookmark, Mail, Heart } from 'lucide-react';
import BurgerMenu from '../BurgerMenu';

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const mobileSearchRef = useRef<HTMLDivElement>(null);
    const desktopSearchRef = useRef<HTMLDivElement>(null);
    const searchIconRef = useRef<HTMLButtonElement>(null);
    const mobileSearchIconRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close search when location changes
    useEffect(() => {
        setIsSearchOpen(false);
    }, [location]);

    // Handle clicks outside the search bar
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            
            // Check if clicked element is inside any search component or search button
            const isClickInsideDesktopSearch = desktopSearchRef.current?.contains(target);
            const isClickInsideMobileSearch = mobileSearchRef.current?.contains(target);
            const isClickOnDesktopIcon = searchIconRef.current?.contains(target);
            const isClickOnMobileIcon = mobileSearchIconRef.current?.contains(target);
            
            // Only close if clicked outside all search-related elements
            if (!isClickInsideDesktopSearch && 
                !isClickInsideMobileSearch && 
                !isClickOnDesktopIcon && 
                !isClickOnMobileIcon) {
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
        e.preventDefault();
        e.stopPropagation();
        setIsSearchOpen(!isSearchOpen);
        
        if (!isSearchOpen) {
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.navLeft}>
                    <Link to="/" className={styles.logo}>
                        UMarket
                    </Link>
                </div>

                {/* Desktop Search - now on the right side like mobile */}
                <div className={styles.navCenter}>
                    {isSearchOpen && (
                        <div className={styles.expandedSearch} ref={desktopSearchRef}>
                            <form onSubmit={handleSearch}>
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
                    )}
                </div>

                {/* Desktop Menu */}
                <div className={styles.desktopRight}>
                    <button 
                        className={`${styles.iconButton}`}
                        onClick={(e) => toggleSearch(e)}
                        aria-label="Toggle search"
                        ref={searchIconRef}
                    >
                        <Search size={24} strokeWidth={1.5} />
                    </button>
                    <div className={styles.search}>
                        <Link to="/sell">
                            Sell
                        </Link>
                    </div>
                    
                    {/* New desktop icons */}
                    <div className={styles.navIconsDesktop}>
                        <Link to="/messages" className={styles.iconButton} aria-label="Messages">
                            <Mail size={24} strokeWidth={1.5} />
                        </Link>
                        <Link to="/likes" className={styles.iconButton} aria-label="Likes">
                            <Heart size={24} strokeWidth={1.5} />
                        </Link>
                        <Link to="/watchlist" className={styles.iconButton} aria-label="Watchlist">
                            <Bookmark size={24} strokeWidth={1.5} />
                        </Link>
                    </div>
                </div>

                {/* Mobile Search - Only shown on mobile */}
                {isSearchOpen && (
                    <div className={styles.mobileSearchInline} ref={mobileSearchRef}>
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
                )}

                {/* Mobile Icons */}
                <div className={styles.mobileIcons}>
                    <button 
                        className={`${styles.iconButton} ${isSearchOpen ? styles.active : ''}`}
                        onClick={(e) => toggleSearch(e)}
                        aria-label="Toggle search"
                        ref={mobileSearchIconRef}
                    >
                        <Search size={24} strokeWidth={1.5} />
                    </button>
                    <Link to="/profile" className={styles.iconButton}>
                        <User size={24} strokeWidth={1.5} />
                    </Link>
                    <Link to="/watchlist" className={styles.iconButton}>
                        <Bookmark size={24} strokeWidth={1.5} />
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
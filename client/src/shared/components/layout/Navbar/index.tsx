import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { User, Search, Bookmark, Mail, Heart, Users, ShoppingBag, Home } from 'lucide-react';
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

    // Check if a path is active (exact match or starts with for nested routes)
    const isPathActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

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
                    {/* Search icon moved to left side */}
                    <button 
                        className={`${styles.iconButton} ${styles.searchButton} ${isSearchOpen ? styles.active : ''}`}
                        onClick={(e) => toggleSearch(e)}
                        aria-label="Toggle search"
                        ref={searchIconRef}
                    >
                        <Search size={26} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Center Nav Icons */}
                <div className={styles.centerNavIcons}>
                    <Link 
                        to="/" 
                        className={`${styles.centerIconButton} ${isPathActive('/') ? styles.active : ''}`} 
                        title="Home"
                    >
                        <Home size={26} strokeWidth={1.5} />
                    </Link>
                    <Link 
                        to="/social" 
                        className={`${styles.centerIconButton} ${isPathActive('/social') ? styles.active : ''}`} 
                        title="Social Feed"
                    >
                        <Users size={26} strokeWidth={1.5} />
                    </Link>
                    <Link 
                        to="/market" 
                        className={`${styles.centerIconButton} ${isPathActive('/market') ? styles.active : ''}`} 
                        title="Marketplace"
                    >
                        <ShoppingBag size={26} strokeWidth={1.5} />
                    </Link>
                </div>

                {/* Desktop Search */}
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
                    <div className={styles.sellButton}>
                        <Link to="/sell">
                            Sell
                        </Link>
                    </div>
                    
                    {/* Desktop icons */}
                    <div className={styles.navIconsDesktop}>
                        <Link 
                            to="/messages" 
                            className={`${styles.iconButton} ${isPathActive('/messages') ? styles.active : ''}`}
                            aria-label="Messages"
                        >
                            <Mail size={26} strokeWidth={1.5} />
                        </Link>
                        <Link 
                            to="/favorites"
                            className={`${styles.iconButton} ${isPathActive('/favorites') ? styles.active : ''}`} 
                            aria-label="Likes"
                        >
                            <Heart size={26} strokeWidth={1.5} />
                        </Link>
                        <Link 
                            to="/watchlist" 
                            className={`${styles.iconButton} ${isPathActive('/watchlist') ? styles.active : ''}`}
                            aria-label="Watchlist"
                        >
                            <Bookmark size={26} strokeWidth={1.5} />
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
                        <Search size={26} strokeWidth={1.5} />
                    </button>
                    <Link 
                        to="/profile" 
                        className={`${styles.iconButton} ${isPathActive('/profile') ? styles.active : ''}`}
                    >
                        <User size={26} strokeWidth={1.5} />
                    </Link>
                    <Link 
                        to="/watchlist" 
                        className={`${styles.iconButton} ${isPathActive('/watchlist') ? styles.active : ''}`}
                    >
                        <Bookmark size={26} strokeWidth={1.5} />
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
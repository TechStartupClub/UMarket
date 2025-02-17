import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoLocationOutline } from "react-icons/io5";
import { User, Search, Bookmark } from 'lucide-react';
import BurgerMenu from '../BurgerMenu';

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
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
                <div className={styles.desktopMenu}>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        <input 
                            placeholder="Search The Market" 
                            className={styles.input} 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className={styles.search}>
                            <Link to="/market">Search</Link>
                        </button>
                    </form>
                    <div className={styles.links}>
                        <Link to="/location">
                            <IoLocationOutline size={30} /> Tacoma Campus
                        </Link>
                    </div>
                </div>

                {/* Mobile Icons */}
                <div className={styles.mobileIcons}>
                    <button 
                        className={styles.iconButton}
                        onClick={toggleSearch}
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

                {/* Mobile Search Bar */}
                {isSearchOpen && (
                    <div className={styles.mobileSearch}>
                        <form onSubmit={handleSearch} className={styles.searchForm}>
                            <input 
                                placeholder="Search The Market" 
                                className={styles.input} 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                            />
                            <button type="submit" className={styles.search}>
                                <Link to="/market">Search</Link>
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { IoLocationOutline } from "react-icons/io5";

const Navbar: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const navigate = useNavigate();

   const handleSearch = (e: React.FormEvent) => {
       e.preventDefault();
       if (searchQuery.trim()) {
           navigate(`/market?search=${encodeURIComponent(searchQuery.trim())}`);
       }
   };

   return (
       <nav className={styles.navbar}>
           <div className={styles.container}>
               <Link to="/" className={styles.logo}>
                   UMarket
               </Link>
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
                   <Link to="/location"><IoLocationOutline size={30} /> Tacoma Campus</Link>
               </div>
           </div>
       </nav>
   );
};

export default Navbar;
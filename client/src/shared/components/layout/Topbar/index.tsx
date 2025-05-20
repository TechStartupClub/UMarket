import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import axios from 'axios';
import styles from './topbar.module.css';
import orange from '../../../../assets/logos/tsc/Orange_Pin.png';

const Topbar: React.FC = () => {
    const [userName, setUserName] = useState('Guest');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                // Replace with your actual API endpoint
                const response = await axios.get('/api/user/profile');
                
                // Assuming the API returns an object with a name property
                if (response.data && response.data.name) {
                    setUserName(response.data.name.split(' ')[0]); // Just get the first name
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
                // Keep the default value if there's an error
            } finally {
                setLoading(false);
            }
        };

        // Check if user is logged in before making the API call
        const token = localStorage.getItem('authToken');
        if (token) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <div className={styles.topbar}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <a href="https://techstartupclub.netlify.app/" target="_blank" rel="noopener noreferrer">
                        <span className={styles.clubName}>
                            <img src={orange} alt="Orange Pin Logo" className={styles.logoImage} />
                            A Project by Tech Startup Club
                        </span>
                    </a>
                </div>
                <div className={styles.right}>
                    <Link to="/about"><span>About</span></Link>
                    <Link to="/contact"><span>Help & Contact</span></Link>
                    <Link to="/profile">
                        <span className={styles.userProfile}>
                            {loading ? (
                                <span className={styles.loadingText}>Loading...</span>
                            ) : (
                                <>
                                    Hi, {userName}
                                    <User size={20} strokeWidth={1.5} className={styles.userIcon} />
                                </>
                            )}
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
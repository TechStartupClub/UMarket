import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import styles from './Topbar.module.css';
import orange from '../../../../assets/logos/tsc/Orange Pin.png';

const Topbar: React.FC = () => {
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
                            Hi, {'Jide'}
                            <User size={20} strokeWidth={1.5} className={styles.userIcon} />
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
import React from 'react';
import Style from './index.module.css';

const Sidebar: React.FC = () => {
    return (
        <div className={Style.mcSidebar}>
            <div>Watchlist</div>
            <div>Purchases</div>
            <div>Selling</div>
            <div>Saved Sellers</div>
            <div>Categories</div>
            <div className={Style.mcsDropdown}>
                <div>Menswear</div>
                <div>Womenswear</div>
                <div>Electronics</div>
                <div>School Materials</div>
            </div>
        </div>
    );
}

export default Sidebar;

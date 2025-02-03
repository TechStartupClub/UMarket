import React from 'react';
import Style from './index.module.css';

const ListCard: React.FC = () => {
    return(
        <div className={Style.mcListCard}>
            <a href="">
                <div className={Style.mcCardImage}>
                    <img src="" alt="Image description" />
                </div>
                <div className={Style.mcCardDescription}>
                    <p>Item Name</p>
                    <p>$$$$$</p>
                </div>
            </a>
        </div>
    );
}

export default ListCard;
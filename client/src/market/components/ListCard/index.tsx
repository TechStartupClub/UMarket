import React from 'react';
import Style from './index.module.css';

interface cardProps {
    name: string,
    price: string,
    url: string,
    img: string,
    imgText: string,
    description?: string
}

const ListCard: React.FC<cardProps> = ({name, price, url, img, imgText}) => {
    return(
        <div className={Style.mcListCard}>
            <a href={url}>
                <div className={Style.mcCardImage}>
                    <img src={img} alt={imgText} />
                </div>
                <div className={Style.mcCardDescription}>
                    <p>{name}</p>
                    <p>${price}</p>
                </div>
            </a>
        </div>
    );
}

export default ListCard;
import React from 'react';
import Style from './index.module.css';
import ListCard from '../ListCard';

const ListView: React.FC = (view) => {
    return (
        <div className={Style.mcListings}>
            <ListCard></ListCard>
        </div>
    );
}

export default ListView;
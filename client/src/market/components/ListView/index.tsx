import React from 'react';
import Style from './index.module.css';
import ListCard from '../ListCard';

const ListView: React.FC = (view) => {
    return (
        <div className={Style.mcListings}>
            <ListCard
                name="TSC Seal"
                price="999"
                url="/"
                img="/src/assets/logos/tsc/Tech%20Startup%20Club%20Logo.png"
                imgText="TSC Seal"></ListCard>
            <ListCard
                name="TSC Seal 2"
                price="1000.00"
                url="/"
                img="/src/assets/logos/tsc/Tech%20Startup%20Club%20Logo.png"
                imgText="TSC Seal"></ListCard>
            <ListCard
                name="TSC Seal 2"
                price="1000.00"
                url="/"
                img="/src/assets/logos/tsc/Tech%20Startup%20Club%20Logo.png"
                imgText="TSC Seal"></ListCard>
            <ListCard
                name="TSC Seal 2"
                price="1000.00"
                url="/"
                img="/src/assets/logos/tsc/Tech%20Startup%20Club%20Logo.png"
                imgText="TSC Seal"></ListCard>
            <ListCard
                name="TSC Seal 2"
                price="1000.00"
                url="/"
                img="/src/assets/logos/tsc/Tech%20Startup%20Club%20Logo.png"
                imgText="TSC Seal"></ListCard>
        </div>
    );
}

export default ListView;
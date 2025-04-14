import React, { useState } from 'react';
import Style from './index.module.css';
import Sidebar from '../../components/Sidebar';
import ListView from '../../components/ListView';
import { Menu, Settings2, ChevronsUpDown } from 'lucide-react';

interface IHeaders {
    sidebarToggleState: () => void
}
interface IFilterBar {
    showOnMobile: boolean
}

const Home: React.FC = () => {
    const [showSidebarMobile, setShowSidebarMobile] = useState(false);

    const toggleSidebarMobile = () => {
        setShowSidebarMobile(!showSidebarMobile);
    }

    return (
        <main>
            <Headers sidebarToggleState={toggleSidebarMobile}></Headers>
            <section>
                <div className={Style.marketContent}>
                    <Sidebar showOnMobile={showSidebarMobile}></Sidebar>
                    <ListView></ListView>
                </div>
            </section>
        </main>
    );
};

const Headers: React.FC<IHeaders> = ({sidebarToggleState}) => {
    const [showFilterBarMobile, setShowFilterBarMobile] = useState(false);
    

    const toggleFilterBarMobile = () => {
        setShowFilterBarMobile(!showFilterBarMobile);
    }

    return (
        <section>
                <div className={Style.marketHeaderA}>
                    <div className="mhTitle">
                        <h1>My Market</h1>
                    </div>
                </div>
                <div className={Style.marketHeaderB}>
                    <div className={Style.mhTabs}>
                        <div className={Style.tabActive}><button>Recently Viewed</button></div>
                        <div><button>Recent Posts</button></div>
                        <div><button>Most Popular</button></div>
                    </div>

                    <div className={Style.mhMiniNav}>
                        <button onClick={sidebarToggleState}><Menu size={26} /></button>
                        <button onClick={toggleFilterBarMobile}><Settings2 size={26} /></button>
                    </div>

                    <FilterBar showOnMobile={showFilterBarMobile} />
                    
                </div>
            </section>
    );
}

const FilterBar: React.FC<IFilterBar> = ({showOnMobile}) => {
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    const toggleShowSortDrop = () => {
        setShowSortDropdown(!showSortDropdown);
    }

    return (
        <div className={`${Style.mhFilters} ${!showOnMobile && Style.hideOnMobile}`}>
            <div className={Style.mhfPriceRange}>
                <div>Price Range</div>
                <input type="text" className={Style.filterTxt} placeholder="Min" />
                to
                <input type="text" className={Style.filterTxt} placeholder="Max" />
            </div>

            <div className={Style.mhSortArea}>
                <button type="button" onClick={toggleShowSortDrop}>
                    <span>
                        Sort <ChevronsUpDown size={16} strokeWidth={3} />
                    </span>
                </button>

                {showSortDropdown && <SortOptions />}
            </div>
        </div>
    );
}

const SortOptions: React.FC = () => {
    return (
        <div className={Style.mhSortOptions}>
            <div><button type="button">Name</button></div>
            <div><button type="button">Leaving Soon</button></div>
        </div>
    );
}



export default Home;

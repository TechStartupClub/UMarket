import React from 'react';
import Style from './index.module.css';
import Sidebar from '../../components/Sidebar';
import ListView from '../../components/ListView';

const Home: React.FC = () => {
    return (
        <main>
            <Headers></Headers>
            <section>
                <div className={Style.marketContent}>
                    <Sidebar></Sidebar>
                    <ListView></ListView>
                </div>
            </section>
        </main>
    );
};

const Headers: React.FC = () => {
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

                    <div className={Style.mhFilters}>
                        <div className={Style.mhfPriceRange}>
                            <div>Price Range</div>
                            <input type="text" className={Style.filterTxt} placeholder="Min" />
                            to
                            <input type="text" className={Style.filterTxt} placeholder="Max" />
                        </div>
                        <div>Sort</div>
                    </div>
                </div>
            </section>
    );
}



export default Home;

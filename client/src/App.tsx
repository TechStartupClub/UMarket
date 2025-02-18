import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './shared/components/layout/PageLayout';
import HomePage from './shared/routes/Home';
import MarketPage from './market/routes/Home';
import AboutPage from './shared/routes/About';
        
const App: React.FC = () => {
   return (
       <Router>
           <PageLayout>
               <Routes>
                   <Route path="/" element={<HomePage />} />
                   <Route path="/market" element={<MarketPage />} />
                   <Route path="/about" element={<AboutPage />} />
               </Routes>
           </PageLayout>
       </Router>
   );
};

export default App;
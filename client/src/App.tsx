import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './shared/routes/Home';
import './App.css';  // Keep this if you have global styles you want to maintain

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* Add more routes as needed */}
                {/* Example:
                <Route path="/market" element={<MarketplacePage />} />
                <Route path="/social" element={<SocialPage />} /> 
                */}
            </Routes>
        </Router>
    );
};

export default App;
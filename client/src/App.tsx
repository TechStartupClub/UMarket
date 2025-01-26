import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './shared/components/layout/PageLayout';
import HomePage from './shared/routes/Home';

const App: React.FC = () => {
   return (
       <Router>
           <PageLayout>
               <Routes>
                   <Route path="/" element={<HomePage />} />
               </Routes>
           </PageLayout>
       </Router>
   );
};

export default App;
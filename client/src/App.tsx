import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './shared/components/layout/PageLayout';
import HomePage from './shared/routes/Home';
import ProfilePage from './shared/routes/user management/Profile';


const App: React.FC = () => {
   return (
       <Router>
           <PageLayout>
               <Routes>
                   <Route path="/" element={<HomePage />} />
                   <Route path="/profile" element={<ProfilePage />} />

               </Routes>
           </PageLayout>
       </Router>
   );
};

export default App;
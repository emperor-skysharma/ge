import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Challenges from './pages/Challenges';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Internships from './pages/Internships';
import Teacher from './pages/Teacher';
import Forums from './pages/Forums';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Nav />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/forums" element={<Forums />} />
        </Routes>
      </main>
      
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>{t('footer.copyright', '© 2023 GreenEd Platform. All rights reserved.')}</p>
          <p className="text-green-200 mt-2">{t('footer.mission', 'Empowering Punjab\'s youth for environmental sustainability')}</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
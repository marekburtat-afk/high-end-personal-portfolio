import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact'; // Nový import
import { ProjectDetail } from './pages/ProjectDetail';
import { StudioPage } from './pages/StudioPage';

const isComingSoon = true; 
const SECRET_KEY = 'ukaz-mi-to';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ComingSoon = () => (
  <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 font-sans">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">MAREK VERŤAT</h1>
      <div className="w-12 h-[1px] bg-neutral-800 mx-auto mb-8"></div>
      <p className="text-neutral-500 uppercase tracking-[0.4em] text-xs md:text-sm">Portfolio coming soon</p>
      <p className="text-neutral-800 text-[10px] mt-24">2026</p>
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('dev') === SECRET_KEY || localStorage.getItem('devMode') === 'true') {
      setIsAuthorized(true);
      localStorage.setItem('devMode', 'true');
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/studio/*" element={<StudioPage />} />
        <Route path="*" element={
          (isComingSoon && !isAuthorized) ? (
            <ComingSoon />
          ) : (
            <div className="min-h-screen bg-background text-white selection:bg-white selection:text-black font-sans flex flex-col">
              <Navigation />
              <main className="flex-grow w-full z-10 relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Work />} />
                  <Route path="/project/:slug" element={<ProjectDetail />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/kontakt" element={<Contact />} /> {/* Nová cesta */}
                </Routes>
              </main>
              <Footer />
            </div>
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
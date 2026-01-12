import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Blog } from './pages/Blog';
import { ProjectDetail } from './pages/ProjectDetail';
import { StudioPage } from './pages/StudioPage';

// --- KONFIGURACE ---
const isComingSoon = true; 
const SECRET_KEY = 'ukaz-mi-to'; // Tvoje "heslo" do URL

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Komponenta pro "Coming Soon" kartu
const ComingSoon = () => (
  <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 font-sans">
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center"
    >
      {/* OPRAVENO JMÉNO */}
      <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">MAREK VERŤAT</h1>
      <div className="w-12 h-[1px] bg-neutral-800 mx-auto mb-8"></div>
      <p className="text-neutral-500 uppercase tracking-[0.4em] text-xs md:text-sm">Portfolio coming soon</p>
      <p className="text-neutral-800 text-[10px] mt-24">2026</p>
    </motion.div>
    
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neutral-800 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-neutral-900 rounded-full blur-[100px]" />
    </div>
  </div>
);

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Kontrola, zda je v URL tajný klíč nebo zda už jsme ho dříve zadali
    const params = new URLSearchParams(window.location.search);
    if (params.get('dev') === SECRET_KEY || localStorage.getItem('devMode') === 'true') {
      setIsAuthorized(true);
      localStorage.setItem('devMode', 'true'); // Zapamatuje si to v tomto prohlížeči
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Administrace je vždy přístupná */}
        <Route path="/studio/*" element={<StudioPage />} />
        
        <Route path="*" element={
          (isComingSoon && !isAuthorized) ? (
            <ComingSoon />
          ) : (
            <div className="min-h-screen bg-background text-white selection:bg-white selection:text-black font-sans flex flex-col">
              <Navigation />
              <main className="flex-grow pt-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full z-10 relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Work />} />
                  <Route path="/project/:slug" element={<ProjectDetail />} />
                  <Route path="/blog" element={<Blog />} />
                </Routes>
              </main>
              <Footer />
              
              <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-20">
                  <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-neutral-800 rounded-full blur-[120px]" />
                  <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-neutral-900 rounded-full blur-[100px]" />
              </div>
            </div>
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;
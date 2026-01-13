import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Blog } from './pages/Blog';
import { Contact } from './pages/Contact';
import { ProjectDetail } from './pages/ProjectDetail';
import { PostDetail } from './pages/PostDetail';
import { StudioPage } from './pages/StudioPage';
import { NetflixIntro } from './components/NetflixIntro';
import { getSettings } from './lib/sanity'; 

const isComingSoon = true; 
const SECRET_KEY = 'ukaz-mi-to';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const ComingSoon = () => (
  <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6 text-center font-black uppercase">
    <h1 className="text-4xl md:text-6xl mb-4">Marek Verťat</h1>
    <p className="text-neutral-500 tracking-[0.5em] text-xs">Coming Soon 2026</p>
  </div>
);

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1. Autorizace
    const params = new URLSearchParams(window.location.search);
    if (params.get('dev') === SECRET_KEY || localStorage.getItem('devMode') === 'true') {
      setIsAuthorized(true);
      localStorage.setItem('devMode', 'true');
    }

    // 2. Kontrola sessionStorage (aby intro nebylo otravné)
    if (sessionStorage.getItem('hasSeenIntro') === 'true') {
      setIntroFinished(true);
    }

    // 3. Načtení nastavení ze Sanity
    getSettings().then(data => {
      if (data?.introVideoUrl) {
        setIntroVideoUrl(data.introVideoUrl);
      } else if (!sessionStorage.getItem('hasSeenIntro')) {
        // Pokud v Sanity video není, web rovnou zobrazíme
        setIntroFinished(true);
      }
    });
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroFinished(true);
  };

  if (isComingSoon && !isAuthorized) {
    return <ComingSoon />;
  }

  return (
    <Router>
      <ScrollToTop />
      
      <AnimatePresence>
        {!introFinished && introVideoUrl && (
          <NetflixIntro videoUrl={introVideoUrl} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      
      <div className={`min-h-screen flex flex-col transition-opacity duration-1000 ${introFinished ? 'opacity-100' : 'opacity-0'}`}>
        <Navigation />
        <main className="flex-grow w-full z-10 relative">
          <Routes>
            <Route path="/studio/*" element={<StudioPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Work />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<PostDetail />} />
            <Route path="/kontakt" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
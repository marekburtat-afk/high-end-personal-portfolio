import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- KOMPONENTA VSTUPNÍ BRÁNY ---
const EnterScreen: React.FC<{ onEnter: () => void }> = ({ onEnter }) => (
  <div className="fixed inset-0 bg-[#050505] z-[200] flex flex-col items-center justify-center text-white p-6">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center"
    >
      <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-[#E50914] text-center leading-none">
        MAREK VEŘTAT
      </h1>
      <button
        onClick={onEnter}
        className="group relative px-12 py-4 bg-transparent border-2 border-white/20 hover:border-[#E50914] transition-all duration-500 overflow-hidden"
      >
        <span className="relative z-10 font-black uppercase tracking-[0.4em] text-xs md:text-sm group-hover:text-white transition-colors">
          VSTOUPIT
        </span>
        <div className="absolute inset-0 bg-[#E50914] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      </button>
      <p className="mt-12 text-neutral-600 text-[10px] uppercase tracking-[0.3em] font-medium">
        VFX & Motion Graphics 2026
      </p>
    </motion.div>
  </div>
);

const App: React.FC = () => {
  const [hasClickedEnter, setHasClickedEnter] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Pokud už uživatel intro v této relaci viděl, vše přeskočíme
    if (sessionStorage.getItem('hasSeenIntro') === 'true') {
      setHasClickedEnter(true);
      setIntroFinished(true);
    }

    // Načtení nastavení ze Sanity
    getSettings().then(data => {
      if (data?.introVideoUrl) {
        setIntroVideoUrl(data.introVideoUrl);
      } else {
        setIntroFinished(true);
        setHasClickedEnter(true);
      }
    }).catch(() => {
      setIntroFinished(true);
      setHasClickedEnter(true);
    });
  }, []);

  useEffect(() => {
    // Blokování scrollu, dokud neběží samotný web
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }
  }, [introFinished]);

  const handleStartEverything = () => {
    setHasClickedEnter(true);
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroFinished(true);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* 1. VRSTVA: Vstupní brána (ukáže se jen pokud uživatel ještě neklikl) */}
      <AnimatePresence>
        {!hasClickedEnter && (
          <motion.div exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <EnterScreen onEnter={handleStartEverything} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. VRSTVA: Netflix Intro (spustí se až po kliku na Vstoupit) */}
      <AnimatePresence mode="wait">
        {hasClickedEnter && !introFinished && introVideoUrl && (
          <NetflixIntro videoUrl={introVideoUrl} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      
      <Routes>
        <Route path="/studio/*" element={<StudioPage />} />
        
        <Route path="*" element={
          <div 
            className={`flex flex-col transition-opacity duration-1000 
              ${introFinished 
                ? 'opacity-100 min-h-[100dvh]' 
                : 'opacity-0 h-0 overflow-hidden pointer-events-none'}`}
          >
            <Navigation />
            <main className="flex-grow w-full z-10 relative">
              <Routes>
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
        } />
      </Routes>
    </Router>
  );
};

export default App;
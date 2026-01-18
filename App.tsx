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
  <div className="fixed inset-0 bg-[#050505] z-[300] flex flex-col items-center justify-center text-white p-6">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
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
  // Inicializace stavů: Striktně kontrolujeme sessionStorage
  const [hasClickedEnter, setHasClickedEnter] = useState(() => {
    return sessionStorage.getItem('hasSeenIntro') === 'true';
  });
  const [introFinished, setIntroFinished] = useState(() => {
    return sessionStorage.getItem('hasSeenIntro') === 'true';
  });
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Pokud uživatel intro viděl, nenačítáme nic a rovnou ho pustíme na web
    if (sessionStorage.getItem('hasSeenIntro') === 'true') return;

    // Jinak načteme video ze Sanity
    getSettings().then(data => {
      if (data?.introVideoUrl) {
        setIntroVideoUrl(data.introVideoUrl);
      }
    });
  }, []);

  useEffect(() => {
    // Blokování scrollu, dokud není web plně zobrazen
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }
  }, [introFinished]);

  const handleStartEverything = () => {
    if (!introVideoUrl) {
      // Fallback: Pokud video ze Sanity nedorazilo, jdeme po kliku rovnou na web
      sessionStorage.setItem('hasSeenIntro', 'true');
      setHasClickedEnter(true);
      setIntroFinished(true);
    } else {
      // Máme video -> Spustíme Netflix Intro
      setHasClickedEnter(true);
    }
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroFinished(true);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* 1. VRSTVA: Vstupní brána - ukáže se jen při prvním vstupu (nová karta) */}
      <AnimatePresence>
        {!hasClickedEnter && (
          <motion.div 
            key="enter-screen"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8 }}
            className="z-[300] relative"
          >
            <EnterScreen onEnter={handleStartEverything} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. VRSTVA: Netflix Intro - spustí se hned po kliku na Vstoupit */}
      <AnimatePresence mode="wait">
        {hasClickedEnter && !introFinished && introVideoUrl && (
          <NetflixIntro videoUrl={introVideoUrl} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
      
      {/* 3. VRSTVA: Samotný Web - skrytý pod intrem, dokud intro neskončí */}
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
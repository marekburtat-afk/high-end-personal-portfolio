import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
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

const App: React.FC = () => {
  // Stav pro kontrolu, zda uživatel viděl intro v této relaci (tabu)
  const [introFinished, setIntroFinished] = useState(() => {
    return sessionStorage.getItem('hasSeenIntro') === 'true';
  });
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Pokud už intro v této relaci proběhlo, nic dalšího nenačítáme
    if (sessionStorage.getItem('hasSeenIntro') === 'true') return;

    // Načtení intro videa ze Sanity
    getSettings().then(data => {
      if (data?.introVideoUrl) {
        setIntroVideoUrl(data.introVideoUrl);
      } else {
        // Pokud video není v Sanity nastaveno, rovnou zobrazíme web
        setIntroFinished(true);
      }
    }).catch(() => {
      setIntroFinished(true);
    });
  }, []);

  useEffect(() => {
    // Blokování scrollu během běžícího úvodního videa
    if (!introFinished && introVideoUrl) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }
  }, [introFinished, introVideoUrl]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroFinished(true);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* INTRO VRSTVA: Spustí se hned, jakmile je URL videa k dispozici */}
      <AnimatePresence mode="wait">
        {!introFinished && introVideoUrl && (
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
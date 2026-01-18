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

// --- OSTRÝ START: Coming Soon a autorizace odstraněny ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Kontrola, zda uživatel viděl intro v této relaci
    if (sessionStorage.getItem('hasSeenIntro') === 'true') {
      setIntroFinished(true);
    }

    // Načtení nastavení (intro video)
    getSettings().then(data => {
      if (data?.introVideoUrl) {
        setIntroVideoUrl(data.introVideoUrl);
      } else {
        setIntroFinished(true);
      }
    });
  }, []);

  useEffect(() => {
    // Blokování scrollu pouze během běžícího úvodního intra
    if (!introFinished && introVideoUrl) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.touchAction = 'auto';
    }
  }, [introFinished, introVideoUrl]);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setIntroFinished(true);
  };

  return (
    <Router>
      <ScrollToTop />
      
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
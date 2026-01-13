import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
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
  <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center text-white p-6 text-center font-black uppercase z-[9999]">
    <h1 className="text-4xl md:text-6xl mb-4 tracking-tighter">Marek Verťat</h1>
    <p className="text-neutral-500 tracking-[0.5em] text-xs">Coming Soon 2026</p>
  </div>
);

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [introVideoUrl, setIntroVideoUrl] = useState<string | null>(null);

  // GLOBÁLNÍ KURZOR STAVY
  const [cursorType, setCursorType] = useState<'none' | 'drag' | 'dragging'>('none');
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    // Sledování myši (clientX/Y jsou souřadnice okna, ignorují scroll)
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    // Posluchač pro zapnutí/vypnutí kuličky z jiných komponent
    const handleCursorChange = (e: any) => {
      setCursorType(e.detail);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('set-global-cursor', handleCursorChange);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('set-global-cursor', handleCursorChange);
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('dev') === SECRET_KEY || localStorage.getItem('devMode') === 'true') {
      setIsAuthorized(true);
      localStorage.setItem('devMode', 'true');
    }

    if (sessionStorage.getItem('hasSeenIntro') === 'true') {
      setIntroFinished(true);
    }

    getSettings().then(data => {
      if (data?.introVideoUrl) {
        setIntroVideoUrl(data.introVideoUrl);
      } else {
        setIntroFinished(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!introFinished && introVideoUrl && isAuthorized) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100dvh';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
      document.body.style.touchAction = 'auto';
    }
  }, [introFinished, introVideoUrl, isAuthorized]);

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

      {/* GLOBÁLNÍ KURZOR - Teď už je nad vším a sedí na milimetr */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-white/40 rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          display: cursorType !== 'none' ? 'block' : 'none',
          scale: cursorType === 'dragging' ? 0.7 : 1,
        }}
      />
      
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
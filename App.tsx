import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Blog } from './pages/Blog';
import { ProjectDetail } from './pages/ProjectDetail';
import { StudioPage } from './pages/StudioPage'; // To je ta nová stránka

// Scroll to top wrapper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* CESTA PRO STUDIO - musí být mimo hlavní design, aby nemělo menu a footer */}
        <Route path="/studio/*" element={<StudioPage />} />
        
        {/* HLAVNÍ WEB S MENU A FOOTEREM */}
        <Route path="*" element={
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
        } />
      </Routes>
    </Router>
  );
};

export default App;
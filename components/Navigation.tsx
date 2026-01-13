import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Netflix styl: barva se mění po malém odscrollování
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Domů', path: '/' },
    { name: 'Moje Práce', path: '/projects' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
          // Na homepagi je průhledná až do scrollu, jinde je černá hned
          (scrolled || !isHome) 
            ? 'bg-[#141414]/90 backdrop-blur-md shadow-2xl py-3 md:py-4' 
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        {/* Šířka a padding nastaveny tak, aby lícovaly s ProjectRow (px-4 md:px-12) */}
        <div className="max-w-[1800px] mx-auto px-4 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-12">
            <Link to="/" className="flex items-center">
              <span className="text-[#E50914] font-black text-2xl md:text-3xl tracking-tighter hover:scale-105 transition-transform">
                MAREK VERŤAT
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-[13px] font-black uppercase tracking-widest transition-colors duration-300 hover:text-white ${
                      location.pathname === link.path ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link 
                to="/kontakt" 
                className="hidden md:block px-6 py-2 bg-[#E50914] text-white text-[11px] font-black uppercase tracking-widest rounded-sm hover:bg-[#ff0a16] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
                KONTAKT
            </Link>
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Spodní dělící linka - viditelná jen při scrollu pro čistý Netflix vibe */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] bg-white/5 transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-[150] flex flex-col items-center justify-center gap-10 md:hidden"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white p-2"
            >
              <X size={32} />
            </button>

             {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-3xl font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/kontakt" 
              className="text-3xl font-black uppercase tracking-[0.2em] text-[#E50914]"
            >
              Kontakt
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
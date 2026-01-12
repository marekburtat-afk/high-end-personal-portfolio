import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-colors duration-500 ${
          scrolled ? 'bg-[#141414] shadow-xl' : 'bg-gradient-to-b from-black/70 to-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center">
              <span className="text-[#E50914] font-black text-2xl md:text-3xl tracking-tighter">
                MAREK VERŤAT
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-sm transition-colors duration-300 hover:text-neutral-300 ${
                      location.pathname === link.path ? 'text-white font-bold' : 'text-neutral-200'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* ZMĚNA: Tlačítko nyní vede na /kontakt pomocí Link */}
            <Link 
                to="/kontakt" 
                className="hidden md:block px-4 py-1.5 bg-[#E50914] text-white text-xs font-bold rounded hover:bg-[#ff0a16] transition-all transform hover:scale-105 active:scale-95"
            >
                KONTAKT
            </Link>
            
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[90] flex flex-col items-center justify-center gap-8 md:hidden"
          >
             {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-2xl font-bold text-neutral-300 hover:text-[#E50914]"
              >
                {link.name}
              </Link>
            ))}
            {/* Kontakt pro mobilní verzi */}
            <Link to="/kontakt" className="text-2xl font-bold text-[#E50914]">Kontakt</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
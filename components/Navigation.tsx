import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Hexagon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Práce', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'O mně', path: '/' }, // Pointing to home/hero for simplicity
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-neutral-800 py-4' : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
          <Link to="/" className="group flex items-center gap-2">
            <Hexagon className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-bold text-lg tracking-wider uppercase">Portfolio</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-sm font-medium tracking-widest hover:text-white transition-colors relative group ${
                    location.pathname === link.path ? 'text-white' : 'text-neutral-400'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
              </Link>
            ))}
            <a 
                href="mailto:contact@example.com" 
                className="px-5 py-2 border border-neutral-700 rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all"
            >
                KONTAKT
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
             {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className="text-2xl font-light tracking-widest text-neutral-300 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
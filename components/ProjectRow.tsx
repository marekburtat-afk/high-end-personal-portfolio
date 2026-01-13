import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { urlFor } from '../lib/sanity';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectRowProps {
  title: string;
  projects: Project[];
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ title, projects }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // 1. SLEDOVÁNÍ MYŠI - absolutně bez lagu a mimo CSS transformace
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (cursorRef.current && isHovering) {
        // Nastavujeme přímo souřadnice okna (viewportu)
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isHovering]);

  if (projects.length === 0) return null;

  // 2. POSOUVÁNÍ (DRAGGING) - 1:1 k pohybu myši
  const onMouseDown = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX); 
    setScrollLeftStart(rowRef.current.scrollLeft);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !rowRef.current) return;
    e.preventDefault();
    const deltaX = e.clientX - startX;
    // Tady je to "přilepení" - o kolik pohneš myší, o tolik se posune pás
    rowRef.current.scrollLeft = scrollLeftStart - deltaX;
  };

  const onMouseUp = () => setIsDragging(false);

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="space-y-2 mb-8 md:mb-12 select-none relative overflow-visible">
      
      {/* MINIMALISTICKÝ KURZOR - PŘÍMO OVLÁDANÝ PŘES REF */}
      <div
        ref={cursorRef}
        className={`
          fixed -translate-x-1/2 -translate-y-1/2 w-14 h-14 border border-white/50 rounded-full 
          pointer-events-none z-[99999] mix-blend-difference transition-transform duration-200
          ${isHovering ? 'opacity-100' : 'opacity-0'}
          ${isDragging ? 'scale-75' : 'scale-100'}
        `}
        style={{ left: '-100px', top: '-100px' }}
      />

      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] px-4 md:px-12 uppercase tracking-tighter">
        {title}
      </h2>
      
      <div className="relative group/row">
        {/* ŠIPKY */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-8 z-[60] w-12 md:w-16 bg-black/60 opacity-0 group-hover/row:opacity-100 transition-all flex items-center justify-center hover:bg-black/80 hidden md:flex"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </button>
        )}

        <div 
          ref={rowRef}
          onScroll={checkScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={() => { onMouseUp(); setIsHovering(false); }}
          onMouseEnter={() => setIsHovering(true)}
          /* cursor-none schová tvou reálnou myš a zbude jen kroužek */
          className={`
            flex gap-1.5 overflow-x-auto scrollbar-hide pt-2 pb-8 px-4 md:px-12
            ${isHovering ? 'cursor-none' : 'cursor-auto'}
            ${isDragging ? 'scroll-auto' : 'scroll-smooth'}
          `}
        >
          {projects.map((project: any) => (
            <motion.div
              key={project._id}
              whileHover={!isDragging ? { scale: 1.05, zIndex: 50 } : {}}
              className="flex-none w-[70%] md:w-[31%] lg:w-[23.8%] relative"
            >
              <Link 
                to={`/project/${project.slug?.current}`} 
                onClick={(e) => isDragging && e.preventDefault()}
                className="block relative rounded-sm overflow-hidden shadow-2xl group"
              >
                <div className="aspect-video bg-neutral-900 relative">
                  <img 
                    src={urlFor(project.mainImage).url()} 
                    alt={project.title}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end pointer-events-none">
                    <div className="flex items-center gap-2 mb-1.5 text-[8px] md:text-[10px] font-black uppercase text-white/60">
                      <span className="text-green-500 font-black">{project.match || 98}% Shoda</span>
                      <span>{project.year || '2026'}</span>
                    </div>
                    <h3 className="text-white text-xs md:text-sm font-black uppercase leading-tight mb-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-0 bottom-8 z-[60] w-12 md:w-16 bg-black/60 opacity-0 group-hover/row:opacity-100 transition-all flex items-center justify-center hover:bg-black/80 hidden md:flex"
          >
            <ChevronRight className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
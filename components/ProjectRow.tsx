import React, { useRef, useState } from 'react';
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
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  if (projects.length === 0) return null;

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
    rowRef.current.scrollLeft = scrollLeftStart - deltaX;
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      // Posuneme o celou šířku kontejneru pro plynulý přechod sekcí
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
    <div className="space-y-4 mb-8 md:mb-12 select-none relative group/main">
      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] px-4 md:px-12 uppercase tracking-tighter">
        {title}
      </h2>
      
      <div className="relative group/row flex items-center">
        {/* LEVÁ ŠIPKA: Větší, více vlevo a silnější pozadí */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-8 z-[60] w-14 md:w-20 bg-black/80 opacity-0 group-hover/row:opacity-100 transition-all flex items-center justify-center hover:bg-black hover:scale-105 hidden md:flex"
          >
            <ChevronLeft className="w-10 h-10 md:w-16 md:h-16 text-white" />
          </button>
        )}

        <div 
          ref={rowRef}
          onScroll={checkScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          // PŘIDÁNO: snap-x snap-mandatory pro magnetické zarovnání
          className={`
            flex gap-2 overflow-x-auto scrollbar-hide pt-2 pb-8 px-4 md:px-12 snap-x snap-mandatory
            ${isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth'}
          `}
        >
          {projects.map((project: any) => (
            <motion.div
              key={project._id}
              whileHover={!isDragging ? { scale: 1.05, zIndex: 50 } : {}}
              // PŘIDÁNO: snap-start pro zarovnání karty na začátek řady
              className="flex-none w-[75%] md:w-[31%] lg:w-[23.8%] relative snap-start"
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end pointer-events-none text-left">
                    <div className="mb-2">
                      <span className="border border-white/40 px-1 text-[8px] md:text-[10px] rounded-[1px] text-white font-black uppercase">
                        {project.quality || '4K ULTRA HD'}
                      </span>
                    </div>

                    <h3 className="text-white text-xs md:text-sm font-black uppercase leading-tight mb-1">
                      {project.title}
                    </h3>

                    <p className="text-[#E50914] text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em]">
                      {project.output || 'REKLAMA'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* PRAVÁ ŠIPKA: Větší, více vpravo a silnější pozadí */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-0 bottom-8 z-[60] w-14 md:w-20 bg-black/80 opacity-0 group-hover/row:opacity-100 transition-all flex items-center justify-center hover:bg-black hover:scale-105 hidden md:flex"
          >
            <ChevronRight className="w-10 h-10 md:w-16 md:h-16 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
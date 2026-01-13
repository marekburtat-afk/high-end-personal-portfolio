import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring, useMotionValue } from 'framer-motion';
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
  
  // Stavy pro Dragging
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  // LOGIKA PRO KULATÝ KURZOR
  const [isHoveringRow, setIsHoveringRow] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animace pro hladký pohyb kurzoru ("magnetic effect")
  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  if (projects.length === 0) return null;

  const handleMouseMove = (e: React.MouseEvent) => {
    // Aktualizace pozice vlastního kurzoru
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // Pokud táhneme, hýbeme řadou
    if (!isDragging || !rowRef.current) return;
    e.preventDefault();
    const x = e.pageX - rowRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Upravený násobitel pro lepší plynulost
    rowRef.current.scrollLeft = scrollLeftState - walk;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - rowRef.current.offsetLeft);
    setScrollLeftState(rowRef.current.scrollLeft);
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
    setIsHoveringRow(false);
  };

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
    <div className="space-y-2 mb-8 md:mb-12 select-none relative">
      {/* VLASTNÍ KULATÝ KURZOR */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-white rounded-full pointer-events-none z-[999] flex items-center justify-center mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHoveringRow ? 1 : 0,
          scale: isDragging ? 0.8 : 1,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <span className="text-black text-[10px] font-black uppercase tracking-widest">
          {isDragging ? 'Hold' : 'Drag'}
        </span>
      </motion.div>

      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] px-4 md:px-12 uppercase tracking-tighter">
        {title}
      </h2>
      
      <div className="relative group/row">
        {/* LEVÁ ŠIPKA */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-0 bottom-8 z-[60] w-12 md:w-16 bg-black/60 opacity-0 group-hover/row:opacity-100 transition-all flex items-center justify-center hover:bg-black/80 hidden md:flex"
          >
            <ChevronLeft className="w-8 h-8 md:w-12 md:h-12 text-white" />
          </button>
        )}

        {/* KONTEJNER PRO KARTY */}
        <div 
          ref={rowRef}
          onScroll={checkScroll}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUpOrLeave}
          onMouseUp={onMouseUpOrLeave}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHoveringRow(true)}
          className={`
            flex gap-1.5 overflow-x-auto scrollbar-hide pt-2 pb-8 px-4 md:px-12
            ${isHoveringRow ? 'cursor-none' : 'cursor-auto'}
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
                    <div className="flex items-center gap-2 mb-1.5 text-[8px] md:text-[10px] font-black uppercase">
                      <span className="text-green-500">{project.match || 98}% Shoda</span>
                      <span className="text-neutral-400">{project.year || '2026'}</span>
                      <span className="border border-neutral-600 px-1 rounded-[1px] text-white">
                        {project.quality || '4K'}
                      </span>
                    </div>
                    <h3 className="text-white text-xs md:text-sm font-black uppercase leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-[#E50914] text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em]">
                      {project.output || 'Visual Art'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* PRAVÁ ŠIPKA */}
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
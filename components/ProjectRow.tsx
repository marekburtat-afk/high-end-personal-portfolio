import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { urlFor } from '../lib/sanity';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Ujisti se, že máš nainstalováno lucide-react

interface ProjectRowProps {
  title: string;
  projects: Project[];
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ title, projects }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (projects.length === 0) return null;

  // Funkce pro plynulý posun (Netflix style)
  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // Hlídání viditelnosti šipek podle pozice scrollu
  const checkScroll = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className="space-y-1 mb-6 md:mb-10 last:mb-0">
      <h2 className="text-[1.2vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] hover:text-white transition-colors px-4 md:px-12 uppercase tracking-tighter cursor-default">
        {title}
      </h2>
      
      <div className="relative group px-4 md:px-12">
        {/* LEVÁ ŠIPKA */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-2 bottom-8 z-[60] w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>
        )}

        <div 
          ref={rowRef}
          onScroll={checkScroll}
          className="flex gap-1.5 overflow-x-auto scrollbar-hide pt-2 pb-8 scroll-smooth"
        >
          {projects.map((project: any) => (
            <motion.div
              key={project._id}
              whileHover={{ 
                scale: 1.05,
                zIndex: 50,
              }}
              className="flex-none w-[200px] md:w-[280px] lg:w-[320px] relative cursor-pointer"
            >
              {/* POJISTKA: project.slug?.current zabrání pádu webu do šedé barvy */}
              <Link to={`/project/${project.slug?.current}`} className="block relative rounded-sm overflow-hidden shadow-2xl">
                <div className="aspect-video bg-neutral-900 relative">
                  <img 
                    src={urlFor(project.mainImage).url()} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-3 md:p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1.5 text-[8px] md:text-[10px] font-black uppercase">
                      <span className="text-green-500">
                        {project.match || 98}% Match
                      </span>
                      <span className="text-neutral-400">
                        {project.year || '2026'}
                      </span>
                      <span className="border border-neutral-600 px-1 rounded-[1px] text-white">
                        {project.quality || '4K'}
                      </span>
                    </div>

                    <h3 className="text-white text-xs md:text-sm font-black uppercase tracking-tight leading-tight mb-0.5">
                      {project.title}
                    </h3>

                    <p className="text-[#E50914] text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em]">
                      {project.output || 'Video Production'}
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
            className="absolute right-0 top-2 bottom-8 z-[60] w-12 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-black/70"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};
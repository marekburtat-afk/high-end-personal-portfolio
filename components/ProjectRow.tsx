import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { urlFor } from '../lib/sanity';

interface ProjectRowProps {
  title: string;
  projects: Project[];
}

export const ProjectRow: React.FC<ProjectRowProps> = ({ title, projects }) => {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-1 mb-2 md:mb-4 last:mb-0">
      <h2 className="text-[1.2vw] md:text-xl lg:text-2xl font-bold text-[#e5e5e5] transition-colors duration-200 hover:text-white cursor-pointer inline-block">
        {title}
      </h2>
      
      <div className="relative group">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pt-2 pb-8 scroll-smooth">
          {projects.map((project: any) => (
            <motion.div
              key={project._id}
              whileHover={{ 
                scale: 1.1,
                zIndex: 50,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              className="flex-none w-[200px] md:w-[280px] lg:w-[320px] relative cursor-pointer"
            >
              <Link to={`/project/${project.slug.current}`} className="block relative rounded-sm overflow-hidden shadow-lg">
                <div className="aspect-video bg-neutral-900 relative">
                  <img 
                    src={urlFor(project.mainImage).url()} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Hover Overlay s Netflix Metadaty */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-3 md:p-4 flex flex-col justify-end">
                    
                    {/* Metadata řada: Shoda, Rok, Kvalita */}
                    <div className="flex items-center gap-2 mb-1.5 text-[8px] md:text-[10px] font-bold tracking-tight">
                      <span className="text-green-500 italic">
                        {project.match || 98}% Match
                      </span>
                      <span className="text-neutral-300">
                        {project.year || '2026'}
                      </span>
                      <span className="border border-neutral-600 px-1 rounded-[1px] text-[7px] md:text-[8px] text-white">
                        {project.quality || '4K'}
                      </span>
                    </div>

                    {/* Titulek projektu */}
                    <h3 className="text-white text-xs md:text-sm lg:text-base font-black uppercase italic leading-tight mb-1">
                      {project.title}
                    </h3>

                    {/* Žánr / Kategorie */}
                    <p className="text-[#E50914] text-[7px] md:text-[9px] font-bold uppercase tracking-widest">
                      {project.genre || project.category || 'Visual Art'}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
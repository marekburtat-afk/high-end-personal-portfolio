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
    <div className="space-y-2 mb-8 last:mb-0">
      {/* Nadpis sekce - více Netflix styl */}
      <h2 className="text-lg md:text-xl font-semibold text-[#e5e5e5] tracking-wide px-4 md:px-12 transition-colors duration-200 hover:text-white cursor-pointer inline-block">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Container pro horizontální scroll s dostatečným paddingem pro scale efekt */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pt-4 pb-12 px-4 md:px-12 scroll-smooth">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ 
                scale: 1.1,
                zIndex: 50,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              className="flex-none w-[200px] md:w-[280px] lg:w-[320px] relative cursor-pointer"
            >
              <Link to={`/project/${project.slug.current}`} className="block relative rounded-md overflow-hidden shadow-lg">
                <div className="aspect-video bg-neutral-900 relative">
                  <img 
                    src={urlFor(project.mainImage)} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Vylepšený Netflix overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                    {/* Název projektu - opraveno ořezávání */}
                    <h3 className="text-white text-[13px] md:text-sm font-bold leading-tight drop-shadow-md mb-1">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-green-400 font-bold">98% Shoda</span>
                      <span className="text-[9px] text-white border border-neutral-500 px-1 rounded-sm uppercase font-medium">HD</span>
                      <span className="text-[10px] text-neutral-300">2024</span>
                    </div>
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
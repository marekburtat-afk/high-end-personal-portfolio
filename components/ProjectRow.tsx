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
    <div className="space-y-4 mb-12 last:mb-0">
      <h2 className="text-lg md:text-2xl font-bold text-neutral-200 tracking-tight px-1">
        {title}
      </h2>
      
      <div className="relative group">
        {/* OPRAVA: pt-8 a pb-16 vytvoří místo, aby se karta při zvětšení (scale) neořízla */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pt-8 pb-16 px-1 scroll-smooth">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ 
                scale: 1.15,
                zIndex: 50,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="flex-none w-[240px] md:w-[340px] relative cursor-pointer"
            >
              <Link to={`/project/${project.slug.current}`} className="block relative">
                <div className="aspect-video rounded-sm shadow-2xl bg-neutral-900 border border-neutral-800/50 relative overflow-hidden group">
                  <img 
                    src={urlFor(project.mainImage)} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Netflix info overlay - opraveno ořezávání textu */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <p className="text-white text-sm font-black uppercase tracking-tighter leading-tight line-clamp-2">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-green-500 font-bold italic">98% Shoda</span>
                      <span className="text-[10px] text-white border border-neutral-600 px-1 rounded-sm">HD</span>
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
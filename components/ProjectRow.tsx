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
      {/* Nadpis sekce - sjednocen font a odstraněno vnitřní odsazení */}
      <h2 className="text-2xl md:text-3xl font-display text-white uppercase tracking-wider transition-colors duration-200 hover:text-neutral-300 cursor-pointer inline-block">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Container pro horizontální scroll - odstraněno px-4/12, aby to lícovalo s nadpisem */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pt-2 pb-12 scroll-smooth">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ 
                scale: 1.05,
                zIndex: 50,
                transition: { duration: 0.3, ease: "easeInOut" }
              }}
              className="flex-none w-[240px] md:w-[320px] lg:w-[380px] relative cursor-pointer"
            >
              <Link to={`/project/${project.slug.current}`} className="block relative rounded-md overflow-hidden shadow-xl bg-[#181818]">
                <div className="aspect-video relative">
                  <img 
                    // OPRAVA: Přidáno .url() pro správné načtení obrázku
                    src={urlFor(project.mainImage).url()} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Netflix overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <h3 className="text-white text-sm md:text-base font-bold leading-tight mb-2">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-green-400 font-bold">98% Shoda</span>
                      <span className="text-[10px] text-white border border-neutral-500 px-1.5 py-0.5 rounded-sm uppercase font-medium">4K Ultra HD</span>
                      <span className="text-[11px] text-neutral-300">2026</span>
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
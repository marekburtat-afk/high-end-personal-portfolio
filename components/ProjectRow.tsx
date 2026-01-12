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
      {/* Nadpis řady - trochu jsme ho odsadili pro lepší rytmus */}
      <h2 className="text-lg md:text-xl font-semibold text-neutral-300 tracking-wide px-1">
        {title}
      </h2>
      
      {/* Kontejner pro scrollování. 
          Přidali jsme větší spodní padding (pb-20), aby se karty při zvětšení měly kam "rozpínat" 
          a neřezaly se o okraj divu.
      */}
      <div className="relative group">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-20 pt-4 px-1 scroll-smooth">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ 
                scale: 1.2, // O trochu výraznější Netflix efekt
                zIndex: 50,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="flex-none w-[220px] sm:w-[280px] md:w-[320px] relative cursor-pointer"
            >
              <Link to={`/project/${project.slug.current}`} className="block relative">
                <div className="aspect-video overflow-hidden rounded-md shadow-lg bg-neutral-900 border border-neutral-800/30 transition-all duration-300 group-hover:shadow-2xl">
                  <img 
                    src={urlFor(project.mainImage)} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Netflix info overlay - teď je jemnější a čitelnější */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <p className="text-white text-xs md:text-sm font-bold uppercase tracking-wider truncate mb-1">
                      {project.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-green-500 font-bold italic">98% Shoda</span>
                      <span className="text-[10px] text-white border border-neutral-500 px-1 rounded-[2px] opacity-70">HD</span>
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
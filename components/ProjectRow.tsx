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
    /* ZMENŠENO: mb-6 md:mb-10 -> mb-2 md:mb-4 pro těsnější řazení pod sebou */
    <div className="space-y-1 mb-2 md:mb-4 last:mb-0">
      <h2 className="text-[1.2vw] md:text-xl lg:text-2xl font-bold text-[#e5e5e5] transition-colors duration-200 hover:text-white cursor-pointer inline-block">
        {title}
      </h2>
      
      <div className="relative group">
        {/* ZMENŠENO: pb-12 -> pb-8 pro zmenšení díry mezi řadami (ponecháno místo pro scale efekt) */}
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pt-2 pb-8 scroll-smooth">
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
              <Link to={`/project/${project.slug.current}`} className="block relative rounded-sm overflow-hidden shadow-lg">
                <div className="aspect-video bg-neutral-900 relative">
                  <img 
                    src={urlFor(project.mainImage).url()} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                    <h3 className="text-white text-xs md:text-sm font-bold">{project.title}</h3>
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
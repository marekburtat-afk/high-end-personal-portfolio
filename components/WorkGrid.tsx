import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { urlFor } from '../lib/sanity';

interface WorkGridProps {
  projects: Project[];
}

export const WorkGrid: React.FC<WorkGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Link to={`/project/${project.slug.current}`} className="group block relative">
            {/* Thumbnail Card */}
            <div className="relative aspect-video overflow-hidden rounded-sm bg-zinc-900 transition-all duration-300 ease-out group-hover:scale-110 group-hover:z-50 shadow-none group-hover:shadow-2xl group-hover:ring-1 group-hover:ring-neutral-700">
               <img 
                 src={urlFor(project.mainImage)} 
                 alt={project.title}
                 className="w-full h-full object-cover"
               />
               
               {/* Info Overlay on Hover */}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <h3 className="text-white text-[10px] md:text-sm font-bold truncate">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] md:text-[10px] text-green-500 font-bold">98% Shoda</span>
                    <span className="text-[8px] md:text-[10px] text-white border border-neutral-600 px-1 uppercase">{project.category}</span>
                  </div>
               </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
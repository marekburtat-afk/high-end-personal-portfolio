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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any, index) => ( // PŘIDÁNO :any - tím zmizí červené podtržení
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <Link to={`/project/${project.slug.current}`} className="group block relative">
            <div className="relative aspect-video overflow-hidden rounded-sm bg-zinc-900 transition-all duration-300 ease-out">
              <img 
                src={urlFor(project.mainImage).url()} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <h3 className="text-white text-xs md:text-base font-black uppercase tracking-tight truncate leading-tight">
                  {project.title}
                </h3>
                
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[8px] md:text-[10px] text-green-500 font-black">
                    {project.match || 98}% Shoda
                  </span>
                  <span className="text-[8px] md:text-[10px] text-white border border-neutral-600 px-1 rounded-[1px] font-black uppercase">
                    {project.quality || '4K'}
                  </span>
                  <span className="text-[8px] md:text-[10px] text-neutral-400 font-black">
                    {project.year || '2026'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
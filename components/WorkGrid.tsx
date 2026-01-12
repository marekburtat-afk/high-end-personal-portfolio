import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { urlFor } from '../lib/sanity';

interface WorkGridProps {
  projects: Project[];
}

export const WorkGrid: React.FC<WorkGridProps> = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group cursor-pointer"
        >
          <Link to={`/project/${project.slug.current}`} className="block">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-900 mb-6">
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
               <img 
                 src={urlFor(project.mainImage)} 
                 alt={project.title}
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
               />
               <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black p-2 rounded-full">
                  <ArrowUpRight size={20} />
               </div>
            </div>

            {/* Content */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-medium text-white group-hover:text-neutral-300 transition-colors mb-2">
                    {project.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                    {project.description}
                </p>
              </div>
              {project.category && (
                <span className="text-xs uppercase tracking-wider text-neutral-600 border border-neutral-800 px-3 py-1 rounded-full">
                    {project.category}
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
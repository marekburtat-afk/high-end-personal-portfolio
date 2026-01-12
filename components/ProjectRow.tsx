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
    <div className="space-y-2 mb-10">
      <h2 className="text-lg md:text-2xl font-semibold text-neutral-200 tracking-tight px-6 md:px-12 lg:px-24">
        {title}
      </h2>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-10 pt-4 px-6 md:px-12 lg:px-24">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            whileHover={{ 
              scale: 1.1,
              zIndex: 50,
              transition: { duration: 0.3 }
            }}
            className="flex-none w-[240px] md:w-[320px] relative"
          >
            <Link to={`/project/${project.slug.current}`} className="block relative">
              <div className="aspect-video overflow-hidden rounded-sm shadow-xl bg-neutral-900 border border-neutral-800">
                <img 
                  src={urlFor(project.mainImage)} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                   <p className="text-white text-sm font-bold uppercase truncate">{project.title}</p>
                   <span className="text-[10px] text-green-500 font-bold mt-1">98% Shoda</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
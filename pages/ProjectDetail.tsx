import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play } from 'lucide-react';
import { getProject, urlFor } from '../lib/sanity';
import { Project } from '../types';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (slug) {
      getProject(slug).then(data => setProject(data));
    }
  }, [slug]);

  if (!project) return <div className="min-h-[50vh] flex items-center justify-center">Načítání...</div>;

  return (
    <article className="pt-12 px-4 md:px-0">
      <Link to="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12">
        <ArrowLeft size={20} /> Zpět na domů
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{project.title}</h1>
            </div>
            <div className="lg:col-span-1 pt-2 border-t border-neutral-800 lg:border-t-0 lg:border-l lg:pl-12">
                <p className="text-neutral-400 leading-relaxed">{project.description}</p>
                {project.category && (
                    <div className="mt-6">
                        <span className="text-xs uppercase tracking-widest text-neutral-600 block mb-1">Kategorie</span>
                        <span className="text-white">{project.category}</span>
                    </div>
                )}
            </div>
        </div>

        {/* Media Section - Video or Image */}
        <div className="w-full aspect-video bg-neutral-900 rounded-xl overflow-hidden mb-20 relative group">
            {project.videoUrl ? (
                <div className="w-full h-full flex items-center justify-center relative">
                    <img 
                        src={urlFor(project.mainImage)} 
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <a 
                        href={project.videoUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer text-black"
                    >
                        <Play fill="currentColor" className="ml-1" />
                    </a>
                </div>
            ) : (
                <img 
                    src={urlFor(project.mainImage)} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
            )}
        </div>
      </motion.div>
    </article>
  );
};
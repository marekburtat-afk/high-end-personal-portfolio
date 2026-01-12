import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, X, Plus, ThumbsUp } from 'lucide-react'; // Tady byla chyba, chyběly ikony
import { getProject, urlFor } from '../lib/sanity';
import { Project } from '../types';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (slug) { getProject(slug).then(data => setProject(data)); }
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">Načítání...</div>;

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const id = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  };

  return (
    <div className="min-h-screen bg-[#141414] -mt-24 pb-20 relative">
      {/* Křížek pro zavření (Zpět na domů) */}
      <Link to="/" className="fixed top-28 right-10 z-[110] bg-black/60 p-2 rounded-full text-white hover:bg-black transition-colors shadow-2xl">
        <X size={32} />
      </Link>

      {/* Video / Hlavní obrázek */}
      <div className="relative h-[60vh] md:h-[80vh] w-full">
        {project.videoUrl ? (
          <iframe 
            className="w-full h-full" 
            src={getEmbedUrl(project.videoUrl)} 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
          ></iframe>
        ) : (
          <img src={urlFor(project.mainImage)} className="w-full h-full object-cover" alt="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
      </div>

      {/* Obsah detailu */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter drop-shadow-2xl text-white">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4 text-sm font-bold">
                <span className="text-green-500">98% Shoda</span>
                <span className="text-neutral-400">2026</span>
                <span className="border border-neutral-600 px-2 py-0.5 text-[10px] rounded-sm text-white">4K</span>
              </div>
              <p className="text-xl text-neutral-200 leading-relaxed font-medium">
                {project.description}
              </p>
            </div>

            <div className="lg:col-span-1 space-y-6">
               <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-full border-2 border-neutral-500 flex items-center justify-center hover:border-white text-white transition-all">
                    <Plus size={24}/>
                  </button>
                  <button className="w-12 h-12 rounded-full border-2 border-neutral-500 flex items-center justify-center hover:border-white text-white transition-all">
                    <ThumbsUp size={24}/>
                  </button>
               </div>
               <div className="text-sm border-l border-neutral-800 pl-4">
                 <p className="text-neutral-500 mb-1 italic text-xs">Kategorie:</p>
                 <p className="text-neutral-200 font-bold uppercase tracking-widest">{project.category}</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
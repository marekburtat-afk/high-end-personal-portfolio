import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Plus, ThumbsUp } from 'lucide-react';
import { getProject, urlFor } from '../lib/sanity';
import { Project } from '../types';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (slug) { getProject(slug).then(data => setProject(data)); }
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white font-bold uppercase tracking-widest">Načítání...</div>;

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const id = url.split('v=')[1]?.split('&')[0];
    // Přidali jsme parametry pro čistší přehrávač bez zbytečností
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;
  };

  return (
    <div className="min-h-screen bg-[#141414] -mt-24 pb-20 relative overflow-x-hidden">
      {/* Křížek pro zavření - fixní pozice, která neuhýbá */}
      <Link 
        to="/" 
        className="fixed top-24 right-6 md:right-12 z-[110] bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-white hover:text-black transition-all shadow-2xl group"
      >
        <X size={28} className="group-hover:scale-110 transition-transform" />
      </Link>

      {/* VIDEO / HERO SEKCE DETAILU */}
      <div className="relative h-[65vh] md:h-[85vh] w-full overflow-hidden bg-black">
        {project.videoUrl ? (
          <div className="absolute inset-0 w-full h-full">
            <iframe 
              // OPRAVA: Iframe se nyní zoomuje správně díky scale a výpočtu poměru stran
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.15] md:scale-[1.35] w-full h-[120%]" 
              style={{ width: '100vw', height: '56.25vw', minHeight: '85vh', minWidth: '151.11vh' }}
              src={getEmbedUrl(project.videoUrl)} 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title={project.title}
            ></iframe>
          </div>
        ) : (
          <img src={urlFor(project.mainImage)} className="w-full h-full object-cover" alt="" />
        )}
        
        {/* Silnější gradient pro plynulý přechod do textu */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/30 to-transparent" />
      </div>

      {/* OBSAH DETAILU */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 -mt-32 md:-mt-48 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 italic uppercase tracking-tighter drop-shadow-2xl text-white">
            {project.title}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Levý sloupec - Popis */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center gap-4 text-sm md:text-base font-bold">
                <span className="text-green-500 italic">98% Shoda</span>
                <span className="text-neutral-400">2026</span>
                <span className="border border-neutral-600 px-2 py-0.5 text-[10px] rounded-sm text-white tracking-widest">4K ULTRA HD</span>
              </div>
              
              <p className="text-lg md:text-2xl text-neutral-200 leading-relaxed font-medium max-w-4xl">
                {project.description}
              </p>
            </div>

            {/* Pravý sloupec - Akce a Meta data */}
            <div className="lg:col-span-1 space-y-10">
               <div className="flex gap-4">
                  <button className="w-14 h-14 rounded-full border-2 border-neutral-500 flex items-center justify-center hover:border-white hover:bg-white/10 text-white transition-all group">
                    <Plus size={28} className="group-hover:scale-110 transition-transform"/>
                  </button>
                  <button className="w-14 h-14 rounded-full border-2 border-neutral-500 flex items-center justify-center hover:border-white hover:bg-white/10 text-white transition-all group">
                    <ThumbsUp size={28} className="group-hover:scale-110 transition-transform"/>
                  </button>
               </div>
               
               <div className="space-y-4">
                 <div className="border-l-2 border-red-600 pl-4">
                   <p className="text-neutral-500 uppercase tracking-[0.2em] text-[10px] mb-1">Kategorie</p>
                   <p className="text-neutral-100 font-bold text-sm md:text-base uppercase tracking-widest">
                     {project.category || 'Video produkce'}
                   </p>
                 </div>
                 
                 <div className="border-l-2 border-neutral-800 pl-4">
                   <p className="text-neutral-500 uppercase tracking-[0.2em] text-[10px] mb-1">Režie</p>
                   <p className="text-neutral-100 font-bold text-sm md:text-base uppercase tracking-widest">Marek Verťat</p>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
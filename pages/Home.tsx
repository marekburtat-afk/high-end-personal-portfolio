import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { getProjects, getHeroData, urlFor } from '../lib/sanity';
import { Project } from '../types';
import { ProjectRow } from '../components/ProjectRow';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [heroProject, setHeroProject] = useState<Project | null>(null);

  useEffect(() => {
    getHeroData().then(setHeroProject);
    getProjects().then(setProjects);
  }, []);

  const getHeroEmbedUrl = (url: string) => {
    if (!url) return "";
    const id = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;
  };

  return (
    <div className="relative -mt-24 pb-20 overflow-x-hidden bg-[#141414]">
      {/* HERO SECTION - Imersivní video přes celou obrazovku */}
      <section className="relative h-[85vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroProject?.videoUrl ? (
            <div className="absolute inset-0 w-full h-full">
              {/* Scale 150 a výpočet paddingu zajistí, že video vždy překryje okraje bez černých pruhů */}
              <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] min-w-full min-h-full object-cover pointer-events-none scale-125"
                src={getHeroEmbedUrl(heroProject.videoUrl)}
                frameBorder="0"
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          ) : heroProject && (
            <img src={urlFor(heroProject.mainImage)} className="w-full h-full object-cover" alt="" />
          )}
          
          {/* Legendární Netflix Gradienty - Spodní a boční stín pro čitelnost */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-80" />
        </div>

        {heroProject && (
          <div className="absolute bottom-[20%] px-6 md:px-12 lg:px-24 w-full z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter uppercase italic drop-shadow-2xl">
                {heroProject.title}
              </h1>
              <p className="text-sm md:text-xl text-neutral-200 max-w-2xl mb-8 line-clamp-3 font-medium drop-shadow-lg leading-relaxed">
                {heroProject.description}
              </p>
              
              <div className="flex gap-4">
                <Link to={`/project/${heroProject.slug.current}`} className="flex items-center gap-2 bg-white text-black px-8 py-2 md:py-3 rounded-md font-bold hover:bg-white/80 transition-all hover:scale-105 active:scale-95">
                  <Play size={24} fill="black" /> Přehrát
                </Link>
                <Link to={`/project/${heroProject.slug.current}`} className="flex items-center gap-2 bg-neutral-500/50 text-white px-8 py-2 md:py-3 rounded-md font-bold hover:bg-neutral-500/70 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                  <Info size={24} /> Více informací
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </section>

      {/* ŘADY PROJEKTŮ POD POZADÍM - Čistý Netflix styl */}
      <div className="relative z-20 -mt-20 space-y-12 pl-6 md:pl-12 lg:pl-24 pr-6">
        <ProjectRow title="Populární u uživatele Marek" projects={projects} />
        <ProjectRow title="Webové zážitky" projects={projects.filter(p => p.category?.toLowerCase().includes('web'))} />
        <ProjectRow title="Video & Motion" projects={projects.filter(p => p.category?.toLowerCase().includes('video'))} />
      </div>
    </div>
  );
};
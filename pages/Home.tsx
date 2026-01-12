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
      {/* HERO SECTION - Používáme tvou původní funkční strukturu */}
      {heroProject && (
        <section className="relative h-[80vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden bg-black">
          {/* VIDEO / IMAGE POZADÍ */}
          <div className="absolute inset-0 z-0">
            {heroProject.videoUrl ? (
              <div className="absolute inset-0 w-full h-full">
                {/* Iframe s výpočtem pro skutečný cover efekt bez oříznutí ovládacích prvků */}
                <iframe
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] h-[56.25vw] min-w-full min-h-full object-cover pointer-events-none"
                  src={getHeroEmbedUrl(heroProject.videoUrl)}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>
            ) : (
              <img 
                src={urlFor(heroProject.mainImage)} 
                className="w-full h-full object-cover" 
                alt="" 
              />
            )}
            
            {/* Netflix Gradienty - Klíč k čitelnosti tlačítek */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-90" />
          </div>

          {/* OBSAH - Pozicování na 1/4 výšky, jak jsi byl zvyklý */}
          <div className="absolute bottom-1/4 px-6 md:px-12 lg:px-24 w-full z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tighter uppercase italic drop-shadow-2xl">
                {heroProject.title}
              </h1>
              <p className="text-sm md:text-lg text-neutral-200 max-w-2xl mb-8 line-clamp-3 font-medium drop-shadow-lg">
                {heroProject.description}
              </p>
              
              <div className="flex gap-4">
                <Link to={`/project/${heroProject.slug.current}`} className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/80 transition-transform hover:scale-105">
                  <Play size={24} fill="black" /> Přehrát
                </Link>
                <Link to={`/project/${heroProject.slug.current}`} className="flex items-center gap-2 bg-neutral-500/50 text-white px-8 py-3 rounded-md font-bold hover:bg-neutral-500/70 backdrop-blur-md transition-transform hover:scale-105">
                  <Info size={24} /> Více informací
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* HORIZONTÁLNÍ ŘADY - Responzivní odsazení pod videem */}
      <div className="relative z-20 -mt-24 md:-mt-32 space-y-12 pl-6 md:pl-12 lg:pl-24">
        <ProjectRow title="Moje tvorba" projects={projects} />
        <ProjectRow title="Webové projekty" projects={projects.filter(p => p.category?.toLowerCase().includes('web'))} />
        <ProjectRow title="Video produkce" projects={projects.filter(p => p.category?.toLowerCase().includes('video'))} />
      </div>
    </div>
  );
};
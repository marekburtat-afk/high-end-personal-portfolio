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
    // Načteme hero video a pak ostatní projekty
    getHeroData().then(setHeroProject);
    getProjects().then(setProjects);
  }, []);

  // Funkce pro transformaci YouTube linku na neustále hrající pozadí bez deformace
  const getHeroEmbedUrl = (url: string) => {
    if (!url) return "";
    const id = url.split('v=')[1]?.split('&')[0];
    // Parametry pro automatické přehrávání, smyčku a schování ovládání
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1`;
  };

  return (
    <div className="relative -mt-24 pb-20 overflow-x-hidden">
      {/* HERO SECTION - STATICKÉ POZADÍ */}
      <section className="relative h-[100vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroProject?.videoUrl ? (
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* iframe je záměrně větší (scale-150), aby se eliminovaly černé okraje u videí na výšku */}
              <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] md:w-full md:h-[115%] object-cover"
                src={getHeroEmbedUrl(heroProject.videoUrl)}
                frameBorder="0"
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          ) : heroProject && (
            <img src={urlFor(heroProject.mainImage)} className="w-full h-full object-cover" alt="" />
          )}
          {/* Netflix Gradienty pro splynutí s webem */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-90" />
        </div>

        {heroProject && (
          <div className="absolute bottom-[25%] px-6 md:px-12 lg:px-24 w-full z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic drop-shadow-2xl">
                {heroProject.title}
              </h1>
              <p className="text-sm md:text-xl text-neutral-200 max-w-2xl mb-8 line-clamp-3 font-medium drop-shadow-lg">
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
        )}
      </section>

      {/* ŘADY PROJEKTŮ POD POZADÍM */}
      <div className="relative z-20 -mt-32 space-y-12 pl-6 md:pl-12 lg:pl-24">
        <ProjectRow title="Populární u uživatele Marek" projects={projects} />
        <ProjectRow title="Webové zážitky" projects={projects.filter(p => p.category?.toLowerCase().includes('web'))} />
        <ProjectRow title="Video & Motion" projects={projects.filter(p => p.category?.toLowerCase().includes('video'))} />
      </div>
    </div>
  );
};
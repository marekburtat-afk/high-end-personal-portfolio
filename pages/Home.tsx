import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { getProjects, urlFor } from '../lib/sanity';
import { Project } from '../types';
import { ProjectRow } from '../components/ProjectRow';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const featured = projects[0];

  // Pomocná funkce pro YouTube Embed na pozadí
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const id = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&modestbranding=1`;
  };

  return (
    <div className="relative -mt-24 pb-20 overflow-x-hidden">
      {featured && (
        <section className="relative h-[100vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="absolute inset-0 z-0">
            {featured.videoUrl ? (
              <iframe
                className="w-full h-full object-cover scale-[1.3]"
                src={getEmbedUrl(featured.videoUrl)}
                frameBorder="0"
                allow="autoplay; encrypted-media"
              ></iframe>
            ) : (
              <img src={urlFor(featured.mainImage)} className="w-full h-full object-cover" alt="" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-90" />
          </div>

          <div className="absolute bottom-[25%] px-6 md:px-12 lg:px-24 w-full z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
              <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic drop-shadow-2xl">
                {featured.title}
              </h1>
              <p className="text-sm md:text-xl text-neutral-200 max-w-2xl mb-8 line-clamp-3 font-medium">
                {featured.description}
              </p>
              <div className="flex gap-4">
                <Link to={`/project/${featured.slug.current}`} className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/80 transition-transform hover:scale-105">
                  <Play size={24} fill="black" /> Přehrát
                </Link>
                <Link to={`/project/${featured.slug.current}`} className="flex items-center gap-2 bg-neutral-500/50 text-white px-8 py-3 rounded-md font-bold hover:bg-neutral-500/70 backdrop-blur-md transition-transform hover:scale-105">
                  <Info size={24} /> Více informací
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <div className="relative z-20 -mt-32 space-y-4">
        <ProjectRow title="Populární u uživatele Marek" projects={projects} />
        <ProjectRow title="Webové zážitky" projects={projects.filter(p => p.category?.toLowerCase().includes('web'))} />
        <ProjectRow title="Video & Motion" projects={projects.filter(p => p.category?.toLowerCase().includes('video'))} />
      </div>
    </div>
  );
};
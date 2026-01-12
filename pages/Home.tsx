import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info, X } from 'lucide-react';
import { getProjects, getHeroData, urlFor, getPartners } from '../lib/sanity';
import { Project } from '../types';
import { ProjectRow } from '../components/ProjectRow';
import { PartnerRow } from '../components/PartnerRow';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [heroProject, setHeroProject] = useState<Project | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false); // Stav pro zobrazení videa

  useEffect(() => {
    getHeroData().then(setHeroProject);
    getProjects().then(setProjects);
    getPartners().then(setPartners);
  }, []);

  const getHeroEmbedUrl = (url: string, isModal: boolean = false) => {
    if (!url) return "";
    const id = url.split('v=')[1]?.split('&')[0];
    // Pro modal chceme zapnout zvuk a ovládací prvky, pro pozadí ne
    const params = isModal 
      ? `autoplay=1&rel=0&modestbranding=1` 
      : `autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;
    return `https://www.youtube.com/embed/${id}?${params}`;
  };

  return (
    <div className="relative pb-20 bg-[#141414]">
      {heroProject && (
        <section className="relative h-[80vh] w-full overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {heroProject.videoUrl ? (
              <div className="absolute inset-0 w-full h-full">
                <iframe
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.35] w-full h-[120%] object-cover"
                  style={{ width: '100vw', height: '56.25vw', minHeight: '80vh', minWidth: '142.22vh' }}
                  src={getHeroEmbedUrl(heroProject.videoUrl)}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                ></iframe>
              </div>
            ) : (
              <img src={urlFor(heroProject.mainImage).url()} className="w-full h-full object-cover" alt="" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-90" />
          </div>

          <div className="absolute bottom-1/4 left-0 right-0 z-10">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter uppercase drop-shadow-2xl">
                  {heroProject.title}
                </h1>
                <p className="text-sm md:text-lg text-neutral-200 max-w-2xl mb-8 line-clamp-3 font-medium drop-shadow-lg">
                  {heroProject.description}
                </p>
                <div className="flex gap-4">
                  {/* TLAČÍTKO PŘEHRÁT: Nyní otevírá modal */}
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/80 transition-transform hover:scale-105"
                  >
                    <Play size={24} fill="black" /> Přehrát
                  </button>
                  <Link 
                    to={`/project/${heroProject.slug.current}`} 
                    className="flex items-center gap-2 bg-neutral-500/50 text-white px-8 py-3 rounded-md font-bold hover:bg-neutral-500/70 backdrop-blur-md transition-transform hover:scale-105"
                  >
                    <Info size={24} /> Více informací
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* VIDEO MODAL (Netflix Style) */}
      <AnimatePresence>
        {showVideoModal && heroProject?.videoUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          >
            {/* Tmavé pozadí */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-sm" 
              onClick={() => setShowVideoModal(false)} 
            />
            
            {/* Kontejner s videem */}
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button 
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X size={24} />
              </button>
              
              <iframe
                className="w-full h-full"
                src={getHeroEmbedUrl(heroProject.videoUrl, true)}
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto mt-[-10vh] relative z-20 space-y-16 px-6 md:px-12 lg:px-24">
        <ProjectRow title="Moje tvorba" projects={projects} />
        {partners.length > 0 && (
          <div className="pt-8 border-t border-white/5"> 
            <PartnerRow partners={partners} />
          </div>
        )}
      </div>
    </div>
  );
};
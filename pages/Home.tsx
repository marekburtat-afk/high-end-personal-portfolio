import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    getHeroData().then(setHeroProject);
    getProjects().then(setProjects);
    getPartners().then(setPartners);
  }, []);

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([^&?]{11})/);
    return match ? match[1] : null;
  };

  const getHeroEmbedUrl = (url: string, isModal: boolean = false) => {
    const id = getYoutubeId(url);
    if (!id) return "";
    const params = isModal 
      ? `autoplay=1&rel=0&modestbranding=1&loop=1&playlist=${id}` 
      : `autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&disablekb=1&enablejsapi=1`;
    return `https://www.youtube.com/embed/${id}?${params}`;
  };

  return (
    <div className="relative pb-20 bg-[#141414]">
      {heroProject && (
        <section className="relative h-[80vh] md:h-[85vh] w-full overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {heroProject.mainImage && (
              <img 
                src={urlFor(heroProject.mainImage).width(1920).quality(80).url()} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
                alt="" 
              />
            )}

            {heroProject.videoUrl && (
              <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <iframe
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none scale-[1.35] w-full h-[120%] object-cover"
                  style={{ width: '100vw', height: '56.25vw', minHeight: '85vh', minWidth: '151.11vh' }}
                  src={getHeroEmbedUrl(heroProject.videoUrl)}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  onLoad={() => setIsVideoLoaded(true)}
                ></iframe>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
          </div>

          <div className="absolute bottom-[15%] md:bottom-1/4 left-0 right-0 z-10">
            <div className="max-w-[1800px] mx-auto px-4 md:px-12 text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                {/* UPRAVENO: Menší písmo pro mobil (text-4xl), obří zůstává pro PC */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-white mb-2 md:mb-4 tracking-tighter uppercase leading-none drop-shadow-2xl">
                  {heroProject.title}
                </h1>
                
                {/* UPRAVENO: Mobilní text-sm, PC text-2xl */}
                <h2 className="text-sm md:text-2xl lg:text-3xl text-neutral-200 max-w-2xl mb-6 md:mb-8 line-clamp-2 font-medium drop-shadow-lg uppercase tracking-tight">
                  {heroProject.description}
                </h2>

                <div className="flex gap-3 md:gap-4">
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded-sm font-black uppercase text-[10px] md:text-sm hover:bg-red-600 hover:text-white transition-all active:scale-95"
                  >
                    <Play size={18} fill="currentColor" /> Přehrát
                  </button>
                  
                  <Link 
                    to="/projects" 
                    className="flex items-center gap-2 bg-neutral-500/40 text-white px-6 md:px-8 py-2 md:py-3 rounded-sm font-black uppercase text-[10px] md:text-sm hover:bg-neutral-500/60 backdrop-blur-md transition-all active:scale-95"
                  >
                    <Info size={18} /> Více informací
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {createPortal(
        <AnimatePresence>
          {showVideoModal && heroProject?.videoUrl && (
            <div className="fixed inset-0 top-0 left-0 w-full h-full z-[99999] flex items-center justify-center pointer-events-none">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-0 left-0 w-full h-full bg-black/95 backdrop-blur-xl pointer-events-auto" 
                onClick={() => setShowVideoModal(false)} 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-[95vw] md:w-[90vw] max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl z-[100000] pointer-events-auto"
              >
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 z-[100001] p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all"
                >
                  <X size={20} />
                </button>
                <iframe
                  className="w-full h-full"
                  src={getHeroEmbedUrl(heroProject.videoUrl, true)}
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* UPRAVENO: Menší odsazení pro mobil, Netflix styl mezery */}
      <div className="relative z-20 -mt-12 md:-mt-20 space-y-12 md:space-y-8 pb-12">
        <ProjectRow title="Moje tvorba" projects={projects} />
        {partners.length > 0 && (
          <div className="pt-6 border-t border-white/5 mx-4 md:px-12"> 
            <PartnerRow partners={partners} />
          </div>
        )}
      </div>
    </div>
  );
};
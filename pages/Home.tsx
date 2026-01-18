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
  // Stav pro sledování, zda je video připraveno k zobrazení
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
        <section className="relative h-[85vh] w-full overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            {/* STILL IMAGE: Tento obrázek je vidět okamžitě */}
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

          <div className="absolute bottom-1/4 left-0 right-0 z-10">
            <div className="max-w-[1800px] mx-auto px-4 md:px-12 text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 tracking-tighter uppercase leading-none drop-shadow-2xl">
                  {heroProject.title}
                </h1>
                <p className="text-sm md:text-lg text-neutral-200 max-w-2xl mb-8 line-clamp-3 font-medium drop-shadow-lg">
                  {heroProject.description}
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowVideoModal(true)}
                    className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-sm font-black uppercase text-sm hover:bg-red-600 hover:text-white transition-all active:scale-95"
                  >
                    <Play size={20} fill="currentColor" /> Přehrát
                  </button>
                  
                  {/* UPRAVENO: Odkaz nyní směřuje na stránku /projects */}
                  <Link 
                    to="/projects" 
                    className="flex items-center gap-2 bg-neutral-500/40 text-white px-8 py-3 rounded-sm font-black uppercase text-sm hover:bg-neutral-500/60 backdrop-blur-md transition-all active:scale-95"
                  >
                    <Info size={20} /> Více informací
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* PORTAL PRO MODAL */}
      {createPortal(
        <AnimatePresence>
          {showVideoModal && heroProject?.videoUrl && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-xl" 
                onClick={() => setShowVideoModal(false)} 
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-[90vw] max-w-6xl aspect-video bg-black rounded-sm overflow-hidden shadow-2xl z-[100000]"
              >
                <button 
                  onClick={() => setShowVideoModal(false)}
                  className="absolute top-4 right-4 z-[100001] p-2 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-all"
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
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="relative z-20 -mt-20 space-y-8 pb-12">
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
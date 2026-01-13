import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react'; // Přidáme ikony pro zvuk

interface NetflixIntroProps {
  videoUrl: string;
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ videoUrl, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Pokusíme se přehrát video se zvukem
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(err => {
          console.warn("Autoplay se zvukem zablokován prohlížečem.", err);
          // Pokud to selže, ukážeme tlačítko "Start" nebo pustíme ztlumeně
          setIsBlocked(true);
        });
      }
    }
  }, []);

  const handleStartWithSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
      setIsBlocked(false);
      setIsMuted(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden touch-none"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onEnded={onComplete}
        className="w-screen h-[100dvh] object-cover pointer-events-none"
        autoPlay
        playsInline
        // Necháme muted false, abychom zkusili zvuk hned
        muted={false}
      />

      {/* MODAL PRO SPUŠTĚNÍ SE ZVUKEM (pokud autoplay selže) */}
      <AnimatePresence>
        {isBlocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[10001] flex items-center justify-center"
          >
            <button
              onClick={handleStartWithSound}
              className="bg-white text-black px-12 py-4 rounded-sm font-black uppercase text-sm tracking-[0.2em] hover:bg-neutral-200 transition-all flex items-center gap-3 shadow-2xl"
            >
              <Volume2 size={20} fill="black" /> Spustit se zvukem
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tlačítko Skip v pravém dolním rohu */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-4 z-[10000]">
        <button 
          onClick={onComplete}
          className="text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10 px-6 py-3 bg-black/40 backdrop-blur-md"
        >
          Skip Intro
        </button>
      </div>
    </motion.div>
  );
};
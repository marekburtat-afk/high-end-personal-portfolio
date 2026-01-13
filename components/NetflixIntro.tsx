import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NetflixIntroProps {
  videoUrl: string;
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ videoUrl, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden touch-none"
    >
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          /* FIX: absolute inset-0 a z-[10000] zaručí, že text už neuteče doleva */
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black z-[10000]"
          >
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12"
            >
              Marek Verťat
            </motion.h1>

            {/* TLAČÍTKO S TEXTEM "VSTOUPIT" A ČERVENÝM HOVEREM */}
            <button
              onClick={handleStart}
              className="group relative px-16 py-4 bg-transparent border-2 border-white/20 rounded-sm transition-all duration-300 hover:border-[#E50914] overflow-hidden"
            >
              <span className="relative z-10 text-white font-black uppercase tracking-[0.5em] text-xs transition-colors duration-300 group-hover:text-white">
                Vstoupit
              </span>
              {/* Netflix Red výplň */}
              <div className="absolute inset-0 bg-[#E50914] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full"
          >
            <video
              ref={videoRef}
              src={videoUrl}
              onEnded={onComplete}
              className="w-screen h-[100dvh] object-cover pointer-events-none"
              autoPlay
              playsInline
            />
            
            <button 
              onClick={onComplete}
              className="absolute bottom-10 right-10 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10 px-6 py-3 bg-black/40 backdrop-blur-md z-[10000]"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
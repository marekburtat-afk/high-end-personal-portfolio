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
    // Díky tomuto kliknutí prohlížeč povolí zvuk u tvého .webm souboru
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
      <AnimatePresence>
        {!hasStarted ? (
          /* 1. ÚVODNÍ OBRAZOVKA: Čistý design, který aktivuje zvuk */
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleStart}
            className="flex flex-col items-center justify-center cursor-pointer group"
          >
            <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 transition-transform group-hover:scale-105 duration-500">
              Marek Verťat
            </h1>
            <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">
              Click to Enter
            </p>
          </motion.div>
        ) : (
          /* 2. SAMOTNÉ INTRO: Teď už jede se zvukem bez ptaní */
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
            
            {/* Skip Intro tlačítko zůstává pro netrpělivé */}
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
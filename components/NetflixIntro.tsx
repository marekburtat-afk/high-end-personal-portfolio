import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NetflixIntroProps {
  videoUrl: string;
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ videoUrl, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay block. Muting for start.", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      // fixed inset-0 + z-index zajistí, že video je nad vším a nepohne se
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden touch-none select-none"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onEnded={onComplete}
        // object-cover zajistí, že video vyplní celou plochu bez mezer
        className="w-full h-[100dvh] object-cover pointer-events-none"
        autoPlay
        playsInline
        muted={false}
      />
      
      <button 
        onClick={onComplete}
        className="absolute bottom-8 right-8 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10 px-6 py-3 rounded-none bg-black/20 backdrop-blur-sm z-[10000]"
      >
        Skip Intro
      </button>
    </motion.div>
  );
};
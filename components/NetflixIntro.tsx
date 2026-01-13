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
        console.warn("Autoplay block. Ztlumuji video pro spuštění.", err);
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
      // FIXED INSET-0 zajistí, že to začíná přesně v rohu [0,0] a nikoliv pod hlavičkou
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden touch-none"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onEnded={onComplete}
        // h-[100dvh] vyplní plochu i na mobilech pod adresním řádkem
        // object-cover zajistí, že video vyplní celou šířku i výšku bez mezer
        className="w-screen h-[100dvh] object-cover pointer-events-none"
        autoPlay
        playsInline
      />
      
      {/* Tlačítko Skip v pravém dolním rohu */}
      <button 
        onClick={onComplete}
        className="absolute bottom-10 right-10 text-white/40 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10 px-6 py-3 bg-black/40 backdrop-blur-md z-[10000]"
      >
        Skip Intro
      </button>
    </motion.div>
  );
};
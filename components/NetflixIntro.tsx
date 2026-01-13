import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NetflixIntroProps {
  videoUrl: string;
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ videoUrl, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Prohlížeče často blokují autoplay se zvukem. 
    // Pokud chceš zvuk, video se nemusí spustit samo bez interakce.
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay s audiem byl zablokován prohlížečem. Video běží ztlumeně.", err);
        if (videoRef.current) videoRef.current.muted = true;
        videoRef.current?.play();
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        onEnded={onComplete}
        className="w-full h-full object-cover md:object-contain"
        autoPlay
        playsInline
        muted={false} // Nastav na true, pokud chceš mít jistotu, že autoplay proběhne vždy
      />

      {/* Tlačítko Přeskočit */}
      <button 
        onClick={onComplete}
        className="absolute bottom-10 right-10 text-white/20 hover:text-white text-[10px] font-black uppercase tracking-[0.3em] transition-all border border-white/10 px-4 py-2 rounded-sm backdrop-blur-md"
      >
        Skip Intro
      </button>
    </motion.div>
  );
};
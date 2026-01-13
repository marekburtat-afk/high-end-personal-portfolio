// src/components/NetflixIntro.tsx
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const NetflixIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'expand' | 'strings' | 'fade'>('initial');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('expand'), 1000),   // M- se rozbalí na jméno
      setTimeout(() => setPhase('strings'), 2600),  // Start exploze vláken
      setTimeout(() => setPhase('fade'), 3800),     // Finální zmizení
      setTimeout(() => onComplete(), 4500)
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {phase !== 'fade' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            className="relative flex items-center justify-center w-full h-full"
            style={{ transformStyle: 'preserve-3d' }} // PŘIDÁNO: Povolí 3D prostor
          >
            {/* TEXT: Marek Verťat */}
            {phase !== 'strings' && (
              <motion.h1
                className="text-[#E50914] font-black text-6xl md:text-9xl uppercase tracking-tighter leading-none italic select-none"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: phase === 'expand' ? 1.05 : 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                {phase === 'initial' ? 'M—' : 'Marek Verťat'}
              </motion.h1>
            )}

            {/* VLÁKNA (Strings) */}
            {phase === 'strings' && (
              <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[1px] md:w-[2px] h-[300vh] netflix-string"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${
                        i % 4 === 0 ? '#E50914' : i % 4 === 1 ? '#ffffff' : i % 4 === 2 ? '#666' : '#222'
                      }, transparent)`,
                      left: `${50 + (i - 20) * 3}%`, // Rozprostření po ploše
                    }}
                    initial={{ translateZ: -2000, opacity: 0 }}
                    animate={{ 
                      translateZ: 1500, // Průlet kolem kamery
                      opacity: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 1.4, 
                      ease: "circIn",
                      delay: i * 0.01 
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
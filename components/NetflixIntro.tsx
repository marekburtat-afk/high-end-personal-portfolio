import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const NetflixIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'initial' | 'expand' | 'strings' | 'fade'>('initial');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('expand'), 800),    // M- se rozbalí
      setTimeout(() => setPhase('strings'), 2400),  // Start "vláken"
      setTimeout(() => setPhase('fade'), 3600),     // Zmizení
      setTimeout(() => onComplete(), 4200)          // Konec
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {phase !== 'fade' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)' }}
            transition={{ duration: 1 }}
            className="relative flex items-center justify-center w-full h-full"
          >
            {/* HLAVNÍ TEXT: M- -> Marek Verťat */}
            {phase !== 'strings' && (
              <motion.h1
                className="text-[#E50914] font-black text-5xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none italic select-none text-center px-4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: phase === 'expand' ? 1.05 : 1, 
                  opacity: 1 
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                {phase === 'initial' ? 'M—' : 'Marek Verťat'}
              </motion.h1>
            )}

            {/* EFEKT VLÁKEN (Netflix Strings) */}
            {phase === 'strings' && (
              <div className="absolute inset-0 flex items-center justify-center">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-[1px] md:w-[2px] h-[250vh]"
                    style={{
                      background: `linear-gradient(to bottom, transparent, ${
                        i % 4 === 0 ? '#E50914' : 
                        i % 4 === 1 ? '#ffffff' : 
                        i % 4 === 2 ? '#444' : '#222'
                      }, transparent)`,
                      left: `${50 + (i - 15) * 3.5}%`,
                      filter: 'blur(1px)',
                    }}
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ 
                      scaleY: [0, 1.2, 1],
                      opacity: [0, 1, 0],
                      translateY: ['-60%', '60%'],
                      scaleX: [1, 2, 5]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      ease: "circIn",
                      delay: i * 0.015 
                    }}
                  />
                ))}
                {/* Centrální záblesk */}
                <motion.div 
                  className="absolute inset-0 bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
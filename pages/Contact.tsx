import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Instagram, Video } from 'lucide-react';
import { getContactData, urlFor } from '../lib/sanity';

export const Contact: React.FC = () => {
  const [data, setData] = useState<any>(null);

  // Paralaxní hodnoty sledování myši
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Vyhlazení pohybu (spring)
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  // Transformace pohybu pro jemný efekt
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  useEffect(() => {
    getContactData().then(setData);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="min-h-screen bg-[#141414] pt-32 pb-20 px-6 md:px-12 lg:px-24 flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* LEVÁ STRANA: Informace */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-12 text-left order-2 lg:order-1"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Kontakt
          </h1>

          <div className="space-y-8">
            <div className="group">
              <h2 className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold mb-2">E-mail</h2>
              <a 
                href="mailto:marek.profile@gmail.com" 
                className="text-xl md:text-3xl font-bold text-white hover:text-[#E50914] transition-colors break-all"
              >
                marek.profile@gmail.com
              </a>
            </div>

            <div>
              <h2 className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold mb-2">Lokalita</h2>
              <div className="flex items-center gap-2 text-xl md:text-3xl font-bold text-white">
                <MapPin className="text-[#E50914]" size={24} />
                Praha
              </div>
            </div>

            <div className="pt-4 flex flex-col space-y-4">
               <h2 className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold mb-1">Sleduj mě</h2>
               <div className="flex gap-6">
                <a 
                  href="https://www.instagram.com/marekvertat/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                >
                  <Instagram size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">Instagram</span>
                </a>
                <a 
                  href="https://www.tiktok.com/@marekvertat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group"
                >
                  <Video size={20} />
                  <span className="text-sm font-bold uppercase tracking-widest">TikTok</span>
                </a>
               </div>
            </div>
          </div>

          {/* MALÉ CTA JAKO DODATEK */}
          <p className="text-neutral-600 text-sm md:text-base italic font-medium pt-8 border-t border-white/5 w-fit">
            Pojďme společně vytvořit něco výjimečného.
          </p>
        </motion.div>

        {/* PRAVÁ STRANA: Fotografie s paralaxou */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2"
        >
          {data?.contactPhoto && (
            <motion.div 
              style={{ rotateX, rotateY, perspective: 1000 }}
              className="relative w-full max-w-[450px] pointer-events-none"
            >
              {/* Efekt záře za fotkou */}
              <div className="absolute inset-0 bg-[#E50914]/10 blur-[100px] rounded-full -z-10" />
              
              <img 
                src={urlFor(data.contactPhoto).url()} 
                alt="Marek Veřtat" 
                className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
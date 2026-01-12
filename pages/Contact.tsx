import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Video } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#141414] pt-32 pb-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Nadpis s tvým CTA */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">
            Pojďme společně <br /> vytvořit něco <br /> <span className="text-[#E50914]">výjimečného</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-20">
            {/* Přímý kontakt */}
            <div className="space-y-10">
              <div>
                <h2 className="text-neutral-500 uppercase tracking-widest text-sm font-bold mb-4">E-mail</h2>
                <a 
                  href="mailto:marek.profile@gmail.com" 
                  className="text-2xl md:text-3xl font-bold text-white hover:text-[#E50914] transition-colors break-words"
                >
                  marek.profile@gmail.com
                </a>
              </div>

              <div>
                <h2 className="text-neutral-500 uppercase tracking-widest text-sm font-bold mb-4">Lokalita</h2>
                <div className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-white">
                  <MapPin className="text-[#E50914]" size={32} />
                  Praha
                </div>
              </div>
            </div>

            {/* Sociální sítě */}
            <div className="space-y-10">
              <h2 className="text-neutral-500 uppercase tracking-widest text-sm font-bold mb-4">Sleduj mě</h2>
              <div className="flex flex-col gap-6">
                <a 
                  href="https://www.instagram.com/marekvertat/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-bold text-neutral-300 hover:text-white transition-all group"
                >
                  <div className="p-3 bg-neutral-900 rounded-full group-hover:bg-[#E50914] transition-colors">
                    <Instagram size={24} />
                  </div>
                  @marekvertat
                </a>
                <a 
                  href="https://www.tiktok.com/@marekvertat" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-xl font-bold text-neutral-300 hover:text-white transition-all group"
                >
                  <div className="p-3 bg-neutral-900 rounded-full group-hover:bg-[#E50914] transition-colors">
                    <Video size={24} />
                  </div>
                  TikTok
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
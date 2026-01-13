import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logo: string;
  description?: string;
}

interface PartnerRowProps {
  partners: Partner[];
}

export const PartnerRow: React.FC<PartnerRowProps> = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    /* pt-2 pro extrémně těsné lícování k horní čáře */
    <div className="pt-2 pb-16 md:pb-24">
      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] uppercase tracking-tighter mb-10 md:mb-14">
        Reference a partneři
      </h2>
      
      {/* Zvětšené mezery mezi logy pro vzdušnější vzhled */}
      <div className="flex flex-wrap items-center justify-start gap-x-16 gap-y-16 md:gap-x-28 md:gap-y-24">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
          >
            {/* VÝRAZNĚ ZVĚTŠENÁ LOGA: h-12 na mobilu až h-20 na velkých obrazovkách */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 md:h-16 lg:h-20 w-auto object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
            />
            
            {/* ZVĚTŠENÝ TOOLTIP S POPISEM */}
            {partner.description && (
              <div className="absolute top-full mt-6 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 min-w-[280px] md:min-w-[400px] max-w-[500px]">
                <div className="bg-[#141414] border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                  {/* Zvětšený název partnera */}
                  <p className="text-[#E50914] text-[11px] md:text-xs font-black uppercase tracking-[0.3em] mb-2">
                    {partner.name}
                  </p>
                  {/* Zvětšený a čitelnější popis ze Sanity */}
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed font-medium">
                    {partner.description}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
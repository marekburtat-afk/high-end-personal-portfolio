import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    /* Změněno py-12 na pt-4 pb-12 pro těsnější lícování k horní čáře */
    <div className="pt-4 pb-12 md:pb-20">
      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] uppercase tracking-tighter mb-8 md:mb-10">
        Reference a partneři
      </h2>
      
      <div className="flex flex-wrap items-center justify-start gap-x-12 gap-y-12 md:gap-x-24 md:gap-y-20">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
          >
            {/* Logo partnera */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 md:h-12 lg:h-14 w-auto object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
            />
            
            {/* TOOLTIP S POPISEM: Zobrazí se při najetí na logo */}
            {partner.description && (
              <div className="absolute top-full mt-4 left-0 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 min-w-[200px] max-w-[300px]">
                <div className="bg-[#141414] border border-white/10 p-3 shadow-2xl backdrop-blur-md">
                  <p className="text-[#E50914] text-[9px] font-black uppercase tracking-[0.2em] mb-1">
                    {partner.name}
                  </p>
                  <p className="text-white/80 text-[10px] leading-relaxed font-medium">
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
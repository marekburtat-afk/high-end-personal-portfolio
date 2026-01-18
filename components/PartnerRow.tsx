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
    <div className="pt-2 pb-16 md:pb-24">
      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] uppercase tracking-tighter mb-10 md:mb-14">
        Reference a partneři
      </h2>
      
      {/* MŘÍŽKA: flex-wrap s lepším centrováním položek */}
      <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-12 md:gap-x-16 md:gap-y-16 lg:gap-x-20">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative flex items-center justify-center w-28 md:w-36 lg:w-44 h-12 md:h-16 lg:h-20"
          >
            {/* LOGA: Nyní v boxu s max-h a max-w pro optické sjednocení */}
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full w-auto object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
            />
            
            {/* TOOLTIP: Zarovnaný na střed boxu */}
            {partner.description && (
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 min-w-[250px] md:min-w-[350px]">
                <div className="bg-[#141414] border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
                  <p className="text-[#E50914] text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] mb-2">
                    {partner.name}
                  </p>
                  <p className="text-white/80 text-[11px] md:text-xs leading-relaxed font-medium">
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
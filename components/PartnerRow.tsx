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
    <div className="py-12 md:py-20">
      <h2 className="text-[1.4vw] md:text-xl lg:text-2xl font-black text-[#e5e5e5] uppercase tracking-tighter mb-10 md:mb-14">
        Reference a partneři
      </h2>
      
      {/* Kontejner pro loga - Flex s wrapem pro responsivitu */}
      <div className="flex flex-wrap items-center justify-start gap-x-12 gap-y-10 md:gap-x-24 md:gap-y-16">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              /* ZVĚTŠENÍ: h-8 na mobilu, h-12 až h-16 na desktopu */
              className="h-10 md:h-14 lg:h-18 w-auto object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
            />
            
            {/* Volitelný tooltip s názvem partnera při najetí */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                {partner.name}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
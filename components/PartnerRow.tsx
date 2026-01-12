import React from 'react';
import { motion } from 'framer-motion';

interface Partner {
  name: string;
  logo: string;
  description: string;
}

interface PartnerRowProps {
  partners: Partner[];
}

export const PartnerRow: React.FC<PartnerRowProps> = ({ partners }) => {
  return (
    <div className="space-y-8">
      {/* OPRAVA: Čistý, tučný nadpis s jemnější šedou barvou podle Netflixu */}
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#e5e5e5] tracking-tight">
        Reference a partneři
      </h2>
      
      <div className="flex flex-wrap gap-x-16 gap-y-10 items-center justify-start">
        {partners.map((partner, index) => (
          <motion.div 
            key={index}
            className="group relative cursor-help"
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-7 md:h-9 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 p-4 bg-[#181818] border border-neutral-800 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="flex flex-col gap-1">
                <span className="text-[#E50914] font-bold text-[10px] uppercase tracking-widest">
                  Spolupráce
                </span>
                <h4 className="text-white font-bold text-sm">{partner.name}</h4>
                <p className="text-neutral-400 text-xs leading-relaxed mt-1">
                  {partner.description}
                </p>
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#181818]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
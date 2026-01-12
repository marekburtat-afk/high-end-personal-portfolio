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
    // Odstraněno py-10, které dělalo příliš velkou mezeru
    <div className="space-y-8">
      {/* Nadpis sjednocen s font-display a velikostí */}
      <h2 className="text-2xl md:text-3xl font-display text-white uppercase tracking-wider">
        Reference a partneři
      </h2>
      
      {/* Zarovnání log přesně na levou hranu bez px-1 */}
      <div className="flex flex-wrap gap-x-16 gap-y-10 items-center justify-start">
        {partners.map((partner, index) => (
          <motion.div 
            key={index}
            className="group relative cursor-help"
            whileHover={{ scale: 1.05 }}
          >
            {/* Logo firmy - mírně zvýšena základní opacita pro lepší čitelnost */}
            <img 
              src={partner.logo} 
              alt={partner.name} 
              className="h-7 md:h-9 w-auto grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />

            {/* Netflix-style Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-64 p-4 bg-[#181818] border border-neutral-800 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
              <div className="flex flex-col gap-1">
                <span className="text-[#E50914] font-display text-xs uppercase tracking-widest">
                  Spolupráce
                </span>
                <h4 className="text-white font-bold text-sm">{partner.name}</h4>
                <p className="text-neutral-400 text-xs leading-relaxed mt-1">
                  {partner.description}
                </p>
              </div>
              {/* Šipka tooltipu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#181818]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
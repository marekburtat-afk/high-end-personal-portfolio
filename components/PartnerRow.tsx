import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Partner {
  name: string;
  logo: string;
  description?: string;
  projectUrl?: string; 
}

interface PartnerRowProps {
  partners: Partner[];
}

export const PartnerRow: React.FC<PartnerRowProps> = ({ partners }) => {
  if (!partners || partners.length === 0) return null;

  return (
    <div className="pt-8 md:pt-2 pb-0 md:pb-24">
      {/* Nadpis sekce: text-2xl na mobilu, na PC tvůj původní styl */}
      <h2 className="text-2xl md:text-xl lg:text-2xl font-black text-[#e5e5e5] uppercase tracking-tighter mb-10 md:mb-14">
        Reference a partneři
      </h2>
      
      {/* Mřížka log:
          MOBIL: 3 sloupce (grid-cols-3)
          PC: flexbox s velkými rozestupy (md:flex)
      */}
      <div className="grid grid-cols-3 gap-y-10 gap-x-4 items-center justify-items-center md:flex md:flex-wrap md:justify-start md:gap-x-16 md:gap-y-16 lg:gap-x-24">
        {partners.map((partner, index) => {
          const isExternal = partner.projectUrl?.startsWith('http');
          
          const LogoContent = (
            <img
              src={partner.logo}
              alt={partner.name}
              className="max-h-full max-w-full w-auto object-contain opacity-40 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
            />
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              /* OPRAVENO: Výrazně zvětšeny rozměry pro PC (md:w-48 lg:w-56) */
              className="group relative flex items-center justify-center w-full max-w-[120px] md:w-48 md:max-w-none lg:w-56 h-12 md:h-20 lg:h-24"
            >
              {partner.projectUrl ? (
                isExternal ? (
                  /* ODSTRANĚNO target="_blank", aby se odkaz otevíral v aktuální kartě */
                  <a href={partner.projectUrl} className="flex items-center justify-center w-full h-full">
                    {LogoContent}
                  </a>
                ) : (
                  <Link to={partner.projectUrl} className="flex items-center justify-center w-full h-full">
                    {LogoContent}
                  </Link>
                )
              ) : (
                LogoContent
              )}
              
              {partner.description && (
                <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 min-w-[250px] md:min-w-[350px]">
                  <div className="bg-[#141414] border border-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl text-center">
                    <p className="text-[#E50914] text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] mb-2">
                      {partner.name}
                    </p>
                    <p className="text-white/80 text-[11px] md:text-xs leading-relaxed font-medium">
                      {partner.description}
                    </p>
                    {partner.projectUrl && (
                      <p className="mt-2 text-[9px] text-white/40 uppercase font-black tracking-widest">Kliknutím zobrazíte projekt</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
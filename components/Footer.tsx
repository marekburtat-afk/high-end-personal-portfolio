import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-neutral-900/50 py-12 px-4 md:px-12 lg:px-24">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* LEVÁ STRANA: Copyright - OPRAVENO JMENO */}
        <div className="text-neutral-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.2em]">
          © {currentYear} Marek Veřtat. Všechna práva vyhrazena.
        </div>

        {/* PRAVÁ STRANA: Pouze Instagram a TikTok */}
        <div className="flex items-center gap-8">
          <a 
            href="https://www.instagram.com/marekvertat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-colors duration-300"
          >
            Instagram
          </a>
          <a 
            href="https://www.tiktok.com/@marekvertat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white text-[10px] md:text-xs font-black uppercase tracking-[0.3em] transition-colors duration-300"
          >
            TikTok
          </a>
        </div>

      </div>
    </footer>
  );
};
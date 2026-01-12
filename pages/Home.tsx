import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { getProjects, urlFor } from '../lib/sanity';
import { Project } from '../types';
import { WorkGrid } from '../components/WorkGrid';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Načteme všechny projekty
    getProjects().then(data => setProjects(data));
  }, []);

  // První projekt v seznamu použijeme jako hlavní "Featured" film/projekt
  const featured = projects[0];

  return (
    <div className="relative -mt-24">
      {/* HERO SECTION - Tenhle blok vytvoří ten Netflix pocit */}
      {featured && (
        <section className="relative h-[85vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
          {/* Pozadí (Obrázek projektu) */}
          <div className="absolute inset-0">
            <img 
              src={urlFor(featured.mainImage)} 
              alt={featured.title}
              className="w-full h-full object-cover object-center"
            />
            {/* Netflix Gradienty pro čitelnost a splynutí s pozadím */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-80" />
          </div>

          {/* Obsah Hero sekce */}
          <div className="absolute bottom-1/4 px-6 md:px-12 lg:px-24 w-full z-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 tracking-tighter drop-shadow-2xl">
                {featured.title}
              </h1>
              <p className="text-sm md:text-lg text-neutral-200 max-w-xl mb-8 line-clamp-3 drop-shadow-md">
                {featured.description}
              </p>
              
              <div className="flex gap-4">
                <Link 
                  to={`/project/${featured.slug.current}`}
                  className="flex items-center gap-2 bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-white/80 transition-all scale-100 hover:scale-105"
                >
                  <Play size={24} fill="black" /> Přehrát
                </Link>
                <Link 
                  to={`/project/${featured.slug.current}`}
                  className="flex items-center gap-2 bg-neutral-500/50 text-white px-4 md:px-8 py-2 md:py-3 rounded-md font-bold hover:bg-neutral-500/70 backdrop-blur-md transition-all scale-100 hover:scale-105"
                >
                  <Info size={24} /> Více informací
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* SEZNAM PROJEKTŮ - Zbytek pod velkým bannerem */}
      <section className="relative z-20 -mt-20 pb-20">
        <div className="flex justify-between items-end mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Moje tvorba</h2>
            <Link to="/projects" className="text-sm text-neutral-400 hover:underline">
                Zobrazit vše
            </Link>
        </div>
        
        {/* Tady se zobrazí tvoje mřížka, kterou hned v dalším kroku upravíme na řady */}
        <WorkGrid projects={projects} />
      </section>
    </div>
  );
};
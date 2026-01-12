import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../lib/sanity';
import { Project } from '../types';
import { ProjectRow } from '../components/ProjectRow';

export const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(data => setProjects(data));
  }, []);

  // Tady si můžeš projekty rozdělit do kategorií (např. podle tagů nebo typu)
  // Pro teď je rozdělíme jen na "Všechny projekty" a "Nové", aby to nevypadalo prázdné
  const commercialProjects = projects.filter(p => p.title.toLowerCase().includes('test')); // Jen příklad
  const personalProjects = projects;

  return (
    <div className="min-h-screen bg-[#141414] pb-20">
      {/* Hero sekce pro Portfolio - aby to nezačínalo hned řádky */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-32 pb-12 px-4 md:px-12"
      >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter italic">
          Portfolio
        </h1>
        <div className="w-24 h-1.5 bg-[#E50914] mb-8" />
        <p className="text-neutral-400 max-w-2xl text-lg font-medium leading-relaxed">
          Kompletní přehled mých komerčních i osobních projektů. 
          Každý projekt je řešením unikátního problému.
        </p>
      </motion.div>

      {/* Tady skládáme řádky jako na Netflixu */}
      <div className="space-y-4 md:-mt-4">
        <ProjectRow title="Moje nejnovější práce" projects={projects} />
        
        {/* Pokud máš více kategorií, můžeš přidat další řádky */}
        <ProjectRow title="Webové projekty" projects={projects.slice(0, 3)} />
        <ProjectRow title="Populární v mém portfoliu" projects={projects} />
      </div>
    </div>
  );
};
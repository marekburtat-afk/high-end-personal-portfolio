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

  // FILTROVÁNÍ PROJEKTŮ DO ŘAD
  // 1. Nejnovější (vezmeme prvních 6 projektů seřazených podle data)
  const newestProjects = projects.slice(0, 6);

  // 2. VFX a Motion Graphics (filtrujeme podle kategorie v Sanity)
  // Tip: V Sanity u těchto projektů napiš do pole Kategorie "vfx"
  const vfxProjects = projects.filter(p => 
    p.category?.toLowerCase().includes('vfx') || 
    p.category?.toLowerCase().includes('motion')
  );

  // 3. Reklamní kampaně
  // Tip: V Sanity u těchto projektů napiš do pole Kategorie "reklama"
  const commercialProjects = projects.filter(p => 
    p.category?.toLowerCase().includes('reklama') || 
    p.category?.toLowerCase().includes('kampaň')
  );

  return (
    <div className="min-h-screen bg-[#141414] pb-32">
      {/* Hero sekce Portfolia */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 px-6 md:px-12 lg:px-24"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 uppercase tracking-tighter italic">
          Portfolio
        </h1>
        <p className="text-neutral-400 max-w-2xl text-lg md:text-xl font-medium leading-tight italic">
          Kompletní přehled mých komerčních i osobních projektů. 
          Každý projekt je výsledkem hledání unikátního vizuálního řešení.
        </p>
      </motion.div>

      {/* STRUKTURA TŘÍ PRUHŮ (Netflix Style) */}
      <div className="space-y-24 px-6 md:px-12 lg:px-24">
        
        {/* 1. PRUH: Nejnovější práce */}
        {newestProjects.length > 0 && (
          <ProjectRow title="Moje nejnovější práce" projects={newestProjects} />
        )}

        {/* 2. PRUH: VFX a Motion Graphics */}
        {vfxProjects.length > 0 && (
          <ProjectRow title="VFX a Motion Graphics" projects={vfxProjects} />
        )}

        {/* 3. PRUH: Reklamní kampaně */}
        {commercialProjects.length > 0 && (
          <ProjectRow title="Reklamní kampaně" projects={commercialProjects} />
        )}

      </div>
    </div>
  );
};
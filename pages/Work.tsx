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

  // FILTRY PRO KATEGORIE: Projekty se řadí podle tvého manuálního pořadí ze Sanity
  const vfxProjects = projects.filter(p => p.category === 'vfx');
  const commercialProjects = projects.filter(p => p.category === 'reklama');

  return (
    <div className="min-h-screen bg-[#141414] pb-32 overflow-x-hidden">
      {/* HEADER: Čistý nadpis v Netflix stylu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-12 px-4 md:px-12"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
          Portfolio
        </h1>
      </motion.div>

      {/* KONTEJNER PRO ŘADY */}
      <div className="space-y-4 md:space-y-12">
        {/* ZDE BYLA SEKCE "MOJE NEJNOVĚJŠÍ PRÁCE" - ODSTRANĚNO */}
        
        {vfxProjects.length > 0 && (
          <ProjectRow title="VFX a Motion Graphics" projects={vfxProjects} />
        )}
        
        {commercialProjects.length > 0 && (
          <ProjectRow title="Reklamní kampaně" projects={commercialProjects} />
        )}
      </div>
    </div>
  );
};
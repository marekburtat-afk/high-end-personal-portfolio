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

  const newestProjects = projects.slice(0, 6);
  const vfxProjects = projects.filter(p => 
    p.category === 'vfx'
  );
  const commercialProjects = projects.filter(p => 
    p.category === 'reklama'
  );

  return (
    <div className="min-h-screen bg-[#141414] pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-8 px-6 md:px-12 lg:px-24" // Sníženo pb-16 na pb-8
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 uppercase tracking-tighter italic leading-none">
          Portfolio
        </h1>
        <p className="text-neutral-500 max-w-2xl text-base md:text-lg font-medium leading-tight italic opacity-80">
          Kompletní přehled mých komerčních i osobních projektů.
        </p>
      </motion.div>

      {/* ZMĚNA: space-y-24 upraveno na space-y-8 (mobil) a space-y-12 (desktop) */}
      <div className="space-y-8 md:space-y-12 px-6 md:px-12 lg:px-24">
        
        {newestProjects.length > 0 && (
          <ProjectRow title="Moje nejnovější práce" projects={newestProjects} />
        )}

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
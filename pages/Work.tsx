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

  return (
    <div className="min-h-screen bg-[#141414] pb-20">
      {/* Hero sekce Portfolia - upravený font a rozestupy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-12 px-6 md:px-12 lg:px-24"
      >
        <h1 className="text-6xl md:text-8xl font-display text-white mb-6 uppercase tracking-wider">
          Portfolio
        </h1>
        {/* Odstraněna červená lišta pro čistší Netflix look, nahrazeno jemným popisem */}
        <p className="text-neutral-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
          Kompletní přehled mých komerčních i osobních projektů. 
          Každý projekt je výsledkem hledání unikátního vizuálního řešení.
        </p>
      </motion.div>

      {/* Zde zůstává pouze jedna řada s nejnovější prací */}
      <div className="px-6 md:px-12 lg:px-24">
        <ProjectRow title="Moje nejnovější práce" projects={projects} />
      </div>
    </div>
  );
};
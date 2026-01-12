import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../lib/sanity';
import { Project } from '../types';
import { WorkGrid } from '../components/WorkGrid';

export const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(data => setProjects(data));
  }, []);

  return (
    <div className="pt-12 space-y-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Portfolio</h1>
        <p className="text-neutral-400 max-w-2xl text-lg">
          Kompletní přehled mých komerčních i osobních projektů. Každý projekt je řešením unikátního problému.
        </p>
      </motion.div>

      <WorkGrid projects={projects} />
    </div>
  );
};
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
    // PŘIDÁNO: max-w-[1400px] a mx-auto pro vycentrování obsahu na střed
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-20 space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase italic tracking-tighter">
          Portfolio
        </h1>
        {/* Červená linka pod nadpisem pro Netflix styl */}
        <div className="w-20 h-1 bg-[#E50914] mb-8" />
        
        <p className="text-neutral-400 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
          Kompletní přehled mých komerčních i osobních projektů. Každý projekt je řešením unikátního problému.
        </p>
      </motion.div>

      <WorkGrid projects={projects} />
    </div>
  );
};
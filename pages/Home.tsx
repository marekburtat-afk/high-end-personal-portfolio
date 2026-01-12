import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getProjects } from '../lib/sanity';
import { Project } from '../types';
import { WorkGrid } from '../components/WorkGrid';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(data => setProjects(data.slice(0, 4))); // Only show first 4
  }, []);

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-blue-500 font-mono text-sm mb-6 block tracking-widest">
            — FRONTEND DEVELOPER & CREATIVE
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
            Tvořím digitální <br/>
            <span className="text-neutral-500">zážitky zítřka.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-xl leading-relaxed mb-12">
            Specializuji se na tvorbu špičkových webových aplikací s důrazem na minimalistický design, plynulé animace a perfektní uživatelskou zkušenost.
          </p>
          
          <div className="flex gap-6">
            <Link 
                to="/projects" 
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-2"
            >
                Zobrazit Práce <ArrowRight size={18} />
            </Link>
            <a 
                href="mailto:me@example.com"
                className="px-8 py-4 border border-neutral-800 rounded-full font-semibold hover:border-white transition-colors"
            >
                Kontaktujte mě
            </a>
          </div>
        </motion.div>
      </section>

      {/* Selected Work */}
      <section>
        <div className="flex justify-between items-end mb-12 border-b border-neutral-900 pb-6">
            <h2 className="text-3xl font-light">Vybrané projekty</h2>
            <Link to="/projects" className="text-sm text-neutral-500 hover:text-white transition-colors">
                Zobrazit vše
            </Link>
        </div>
        <WorkGrid projects={projects} />
      </section>
    </div>
  );
};
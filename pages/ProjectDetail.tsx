import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getProject, urlFor } from '../lib/sanity';
import { Project } from '../types';
import { PortableText } from '@portabletext/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const ptComponents = {
  types: {
    imageWithCaption: ({ value }: any) => (
      <figure className="my-12 space-y-3">
        <div className="rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
          <img src={urlFor(value).width(1200).url()} alt={value.alt || ''} className="w-full h-auto" />
        </div>
        {value.caption && <figcaption className="text-center text-neutral-500 italic text-sm border-l-2 border-red-600 py-1 px-4 bg-neutral-900/10">{value.caption}</figcaption>}
      </figure>
    ),
    videoEmbed: ({ value }: any) => {
      const id = value.url?.includes('v=') ? value.url.split('v=')[1]?.split('&')[0] : value.url?.split('/').pop();
      return (
        <div className="my-12 aspect-video rounded-lg overflow-hidden border border-neutral-800 shadow-2xl bg-black">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}?rel=0`} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    },
    beforeAfterSlider: ({ value }: any) => (
      <div className="my-20 space-y-6">
        <div className="flex justify-between items-end mb-2 uppercase tracking-[0.3em] text-[10px] text-neutral-500 font-black">
          <span>Před</span>
          <span className="text-red-600">Po</span>
        </div>
        <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={urlFor(value.beforeImage).width(1400).url()} alt="Před" />}
            itemTwo={<ReactCompareSliderImage src={urlFor(value.afterImage).width(1400).url()} alt="Po" />}
            handle={
              <div className="relative h-full flex items-center justify-center">
                <div className="w-[2px] h-full bg-[#E50914] shadow-[0_0_20px_rgba(229,9,20,1)]"></div>
                <div className="absolute w-12 h-12 bg-[#E50914] rounded-full flex items-center justify-center border-2 border-white cursor-ew-resize shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
                  </svg>
                </div>
              </div>
            }
          />
        </div>
      </div>
    ),
  },
  block: {
    normal: ({ children }: any) => <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-8 font-light max-w-4xl">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-5xl font-black text-white mt-20 mb-8 uppercase tracking-tighter border-b border-red-600 pb-2 inline-block">{children}</h2>,
  }
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any | null>(null);

  useEffect(() => {
    if (slug) { getProject(slug).then(data => setProject(data)); }
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white font-black uppercase tracking-[0.5em]">Loading...</div>;

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    const id = url.includes('v=') ? url.split('v=')[1]?.split('&')[0] : url.split('/').pop();
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&loop=1&playlist=${id}`;
  };

  return (
    <div className="min-h-screen bg-[#141414] -mt-24 pb-32 relative overflow-x-hidden">
      <Link to="/" className="fixed top-24 right-6 md:right-12 z-[110] bg-black/60 backdrop-blur-xl p-4 rounded-full text-white hover:bg-red-600 transition-all shadow-2xl border border-white/10"><X size={24} /></Link>
      <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
        {project.videoUrl ? (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <iframe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.2] md:scale-[1.5] w-full h-full" style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh' }} src={getEmbedUrl(project.videoUrl)} frameBorder="0" allow="autoplay; encrypted-media"></iframe>
          </div>
        ) : (
          project.mainImage && <img src={urlFor(project.mainImage).url()} className="w-full h-full object-cover" alt="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 -mt-40 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-10 uppercase tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            {project.title}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-6 text-sm font-black mb-8">
                <span className="text-green-500 italic">{project.match || 98}% MATCH</span>
                <span className="text-neutral-400">{project.year || '2026'}</span>
                <span className="border border-neutral-700 px-3 py-1 text-[10px] rounded-sm text-white bg-white/5 tracking-[0.2em]">
                  {project.quality || '4K ULTRA HD'}
                </span>
              </div>
              <p className="text-xl md:text-3xl text-neutral-200 leading-tight font-medium max-w-4xl">
                {project.description}
              </p>
            </div>
            <div className="lg:col-span-1 space-y-6 border-l border-red-600/30 pl-6 font-black">
               <div>
                 {/* ZMĚNA: Popisek na Žánr */}
                 <p className="text-neutral-500 uppercase tracking-widest text-[9px] mb-1">Žánr</p>
                 <p className="text-white text-sm uppercase">{project.genre || project.category || 'Visual Art'}</p>
               </div>
               <div>
                 {/* ZMĚNA: Popisek na Výstup a propojení na project.output */}
                 <p className="text-neutral-500 uppercase tracking-widest text-[9px] mb-1">Výstup</p>
                 <p className="text-white text-sm uppercase">
                   {project.output || 'Online'}
                 </p>
               </div>
            </div>
          </div>
          <div className="rich-text-content border-t border-white/5 pt-20">{project.content && <PortableText value={project.content} components={ptComponents} />}</div>
        </motion.div>
      </div>
    </div>
  );
};
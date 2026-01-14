import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getProject, urlFor } from '../lib/sanity';
import { Project } from '../types';
import { PortableText } from '@portabletext/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const ptComponents = {
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-black text-white">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-neutral-200">{children}</em>
    ),
    underline: ({ children }: any) => (
      <span className="underline decoration-red-600 underline-offset-4">{children}</span>
    ),
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-red-600 hover:text-white underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },

  // OPRAVA SEZNAMŮ (TEČEK)
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc ml-6 md:ml-8 space-y-2 mb-8 text-neutral-300 decoration-red-600">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal ml-6 md:ml-8 space-y-2 mb-8 text-neutral-300">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="pl-2 marker:text-red-600 text-lg md:text-xl">{children}</li>
    ),
  },

  types: {
    imageWithCaption: ({ value }: any) => {
      const isFloating = value.alignment === 'left' || value.alignment === 'right';
      const floatClass = value.alignment === 'left' ? 'md:float-left md:mr-10 md:mb-6' : value.alignment === 'right' ? 'md:float-right md:ml-10 md:mb-6' : '';
      const widthClass = isFloating ? 'md:w-1/2 w-full' : 'w-full';

      return (
        <figure className={`my-12 ${floatClass} ${widthClass} space-y-3 clear-both`}>
          <div className="rounded-sm overflow-hidden border border-white/5 shadow-2xl">
            <img 
              src={urlFor(value).width(isFloating ? 800 : 1400).url()} 
              alt={value.alt || ''} 
              className="w-full h-auto object-cover" 
            />
          </div>
          {value.caption && (
            <figcaption className="text-neutral-500 italic text-sm border-l-2 border-red-600 py-1 px-4 bg-white/5">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    videoEmbed: ({ value }: any) => {
      const id = value.url?.includes('v=') ? value.url.split('v=')[1]?.split('&')[0] : value.url?.split('/').pop();
      return (
        <div className="my-12 aspect-video rounded-sm overflow-hidden border border-white/5 shadow-2xl bg-black clear-both">
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}?rel=0`} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    },
    beforeAfterSlider: ({ value }: any) => {
      const isFloating = value.alignment === 'left' || value.alignment === 'right';
      const floatClass = value.alignment === 'left' ? 'md:float-left md:mr-10 md:mb-6' : value.alignment === 'right' ? 'md:float-right md:ml-10 md:mb-6' : '';
      const widthClass = isFloating ? 'md:w-1/2 w-full' : 'w-full';

      return (
        <div className={`my-16 ${floatClass} ${widthClass} space-y-4 clear-both`}>
          <div className="flex justify-between items-end mb-2 uppercase tracking-[0.2em] text-[10px] font-black text-white/60">
            <span className="border-b border-white/20 pb-1">Před úpravou</span>
            <span className="text-red-600 border-b border-red-600/40 pb-1">Finální VFX</span>
          </div>
          <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={urlFor(value.beforeImage).width(1400).url()} alt="Před" />}
              itemTwo={<ReactCompareSliderImage src={urlFor(value.afterImage).width(1400).url()} alt="Po" />}
              handle={
                <div className="relative h-full flex items-center justify-center">
                  <div className="w-[2px] h-full bg-red-600 shadow-[0_0_15px_rgba(229,9,20,0.8)]"></div>
                  <div className="absolute w-8 h-8 bg-red-600 rounded-full flex items-center justify-center border border-white/20 cursor-ew-resize">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
                    </svg>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      );
    },
  },

  block: {
    normal: ({ children }: any) => <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-8 font-medium max-w-4xl">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-3xl md:text-5xl font-black text-white mt-20 mb-10 uppercase tracking-tighter border-l-4 border-red-600 pl-6">{children}</h2>,
    // OPRAVA NADPISU H3 (PŘÍPRAVA A KONCEPT)
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-black text-white mt-12 mb-6 uppercase tracking-tight">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-red-600 pl-6 italic text-2xl text-white my-10 bg-white/5 py-8 pr-8 rounded-r-sm">{children}</blockquote>,
  }
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any | null>(null);

  useEffect(() => {
    if (slug) { getProject(slug).then(data => setProject(data)); }
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white font-black uppercase tracking-widest">Načítám projekt...</div>;

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
          
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 uppercase tracking-tighter text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] leading-none">
            {project.title}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-6 text-[10px] md:text-xs font-black mb-8 tracking-widest">
                <span className="text-green-500">{project.match || 98}% MATCH</span>
                <span className="text-neutral-400">{project.year || '2026'}</span>
                <span className="border border-white/20 px-3 py-1 rounded-sm text-white bg-white/5 uppercase">
                  {project.quality || '4K ULTRA HD'}
                </span>
              </div>
              <p className="text-2xl md:text-4xl text-white leading-[1.1] font-bold max-w-4xl mb-12">
                {project.description}
              </p>
            </div>
            
            <div className="lg:col-span-1 space-y-6 border-l border-red-600/40 pl-8 font-black self-start">
               <div>
                 <p className="text-neutral-500 uppercase tracking-widest text-[9px] mb-2">Žánr</p>
                 <p className="text-white text-sm uppercase">{project.genre || project.category || 'Visual Art'}</p>
               </div>
               <div>
                 <p className="text-neutral-500 uppercase tracking-widest text-[9px] mb-2">Výstup</p>
                 <p className="text-white text-sm uppercase">{project.output || 'Online'}</p>
               </div>
            </div>
          </div>

          <div className="rich-text-content border-t border-white/10 pt-16">
            {project.content && <PortableText value={project.content} components={ptComponents} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
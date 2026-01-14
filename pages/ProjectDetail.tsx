import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getProject, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

// Pomocná funkce pro YouTube ID
const getYoutubeId = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match ? match[1] : null;
};

const ptComponents = {
  marks: {
    strong: ({ children }: any) => <strong className="font-black text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-neutral-200">{children}</em>,
    underline: ({ children }: any) => <span className="underline decoration-red-600 underline-offset-4">{children}</span>,
  },

  // OBNOVENO: Červené tečky a správné odsazení seznamů
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 space-y-2 mb-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="marker:text-red-600 text-neutral-300 text-lg md:text-xl pl-2">{children}</li>
    ),
  },

  types: {
    imageWithCaption: ({ value }: any) => {
      const isFloating = value.alignment === 'left' || value.alignment === 'right';
      const floatClass = value.alignment === 'left' ? 'md:float-left md:mr-8 md:mb-4' : value.alignment === 'right' ? 'md:float-right md:ml-8 md:mb-4' : '';
      const widthClass = isFloating ? 'md:w-1/2 w-full' : 'w-full';
      return (
        <figure className={`my-8 ${floatClass} ${widthClass} space-y-3 clear-both`}>
          <div className="rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
            <img src={urlFor(value).width(1400).url()} alt={value.alt || ''} className="w-full h-auto object-cover" />
          </div>
          {value.caption && <figcaption className="text-neutral-500 italic text-sm border-l-2 border-red-600 py-1 px-4 bg-neutral-900/10">{value.caption}</figcaption>}
        </figure>
      );
    },

    videoEmbed: ({ value }: any) => {
      const isFloating = value.alignment === 'left' || value.alignment === 'right';
      const floatClass = value.alignment === 'left' ? 'md:float-left md:mr-8 md:mb-4' : value.alignment === 'right' ? 'md:float-right md:ml-8 md:mb-4' : '';
      const widthClass = isFloating ? 'md:w-1/2 w-full' : 'w-full';
      const id = getYoutubeId(value.url);
      
      return (
        <div className={`my-8 ${floatClass} ${widthClass} aspect-video rounded-lg overflow-hidden border border-neutral-800 shadow-2xl bg-black clear-both`}>
          <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${id}?rel=0`} frameBorder="0" allowFullScreen></iframe>
        </div>
      );
    },

    mediaGrid: ({ value }: any) => {
      const columns = value.items?.length || 2;
      return (
        <div className={`my-12 grid grid-cols-1 md:grid-cols-${columns} gap-6 clear-both`}>
          {value.items?.map((item: any, index: number) => (
            <div key={index} className="space-y-3">
              {item._type === 'videoEmbed' ? (
                <div className="aspect-video rounded-lg overflow-hidden border border-neutral-800 shadow-xl bg-black">
                  <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${getYoutubeId(item.url)}?rel=0`} frameBorder="0" allowFullScreen></iframe>
                </div>
              ) : (
                <div className="rounded-lg overflow-hidden border border-neutral-800 shadow-xl">
                  <img src={urlFor(item).width(800).url()} alt="" className="w-full h-auto object-cover" />
                </div>
              )}
              {item.caption && <p className="text-neutral-500 text-xs italic px-2">{item.caption}</p>}
            </div>
          ))}
        </div>
      );
    },

    beforeAfterSlider: ({ value }: any) => {
      const isFloating = value.alignment === 'left' || value.alignment === 'right';
      const floatClass = value.alignment === 'left' ? 'md:float-left md:mr-8 md:mb-4' : value.alignment === 'right' ? 'md:float-right md:ml-8 md:mb-4' : '';
      const widthClass = isFloating ? 'md:w-1/2 w-full' : 'w-full';
      return (
        <div className={`my-12 ${floatClass} ${widthClass} space-y-4 clear-both`}>
          <div className="flex justify-between items-end mb-2 uppercase tracking-[0.2em] text-xs font-black text-white/90">
            <span className="bg-black/40 px-3 py-1 rounded-sm border border-white/10">Před</span>
            <span className="bg-red-600/20 px-3 py-1 rounded-sm border border-red-600/30 text-red-500">Po</span>
          </div>
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <ReactCompareSlider
              itemOne={<ReactCompareSliderImage src={urlFor(value.beforeImage).width(1400).url()} alt="Před" />}
              itemTwo={<ReactCompareSliderImage src={urlFor(value.afterImage).width(1400).url()} alt="Po" />}
            />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }: any) => <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-6 font-light">{children}</p>,
    h2: ({ children }: any) => (
      <div className="flex items-center gap-4 mt-16 mb-8">
        <div className="w-1 h-10 bg-red-600"></div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">{children}</h2>
      </div>
    ),
    // OBNOVENO: Styl pro H3 nadpisy
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-black text-white mt-10 mb-5 uppercase tracking-tight">{children}</h3>,
  }
};

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<any | null>(null);

  useEffect(() => {
    if (slug) { getProject(slug).then(data => setProject(data)); }
  }, [slug]);

  if (!project) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white font-black uppercase tracking-widest">Načítám projekt...</div>;

  return (
    <div className="min-h-screen bg-[#141414] pb-32 relative overflow-x-hidden">
      <Link to="/" className="fixed top-24 right-6 md:right-12 z-[110] bg-black/60 backdrop-blur-xl p-4 rounded-full text-white hover:bg-red-600 transition-all border border-white/10 shadow-2xl">
        <X size={24} />
      </Link>

      <div className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
        {project.videoUrl ? (
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <iframe 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[1.2] md:scale-[1.5] w-full h-full" 
              style={{ width: '100vw', height: '56.25vw', minHeight: '100vh', minWidth: '177.77vh' }} 
              src={`https://www.youtube.com/embed/${getYoutubeId(project.videoUrl)}?autoplay=1&mute=1&loop=1&playlist=${getYoutubeId(project.videoUrl)}&rel=0&modestbranding=1`} 
              frameBorder="0" 
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
        ) : (
          project.mainImage && <img src={urlFor(project.mainImage).url()} className="w-full h-full object-cover" alt="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 -mt-40 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-12 uppercase tracking-tighter text-white drop-shadow-2xl leading-none">
            {project.title}
          </h1>

          <div className="rich-text-content border-t border-white/10 pt-12">
            {project.content && <PortableText value={project.content} components={ptComponents} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
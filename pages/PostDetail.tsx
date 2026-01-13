import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import { getPost, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const ptComponents = {
  marks: {
    strong: ({ children }: any) => <strong className="font-black text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-neutral-200">{children}</em>,
    underline: ({ children }: any) => <span className="underline decoration-red-600 underline-offset-4">{children}</span>,
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
    normal: ({ children }: any) => <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-6 font-light max-w-4xl">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-4xl font-black text-white mt-12 mb-6 uppercase tracking-tighter border-b border-red-600 pb-2 inline-block">{children}</h2>,
  }
};

export const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any | null>(null);

  useEffect(() => {
    if (slug) { getPost(slug).then(data => setPost(data)); }
  }, [slug]);

  // OPRAVA: Odstraněno 'italic' z načítacího textu
  if (!post) return <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white font-black uppercase tracking-widest">Načítám článek...</div>;

  return (
    <div className="min-h-screen bg-[#141414] pb-32 relative overflow-x-hidden">
      <Link to="/blog" className="fixed top-24 right-6 md:right-12 z-[110] bg-black/60 backdrop-blur-xl p-4 rounded-full text-white hover:bg-red-600 transition-all border border-white/10">
        <X size={24} />
      </Link>

      <div className="relative h-[60vh] w-full overflow-hidden">
        {post.mainImage && (
          <img src={urlFor(post.mainImage).url()} className="w-full h-full object-cover" alt={post.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
      </div>

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-24 -mt-32 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-red-600 mb-6">
            <span className="flex items-center gap-2"><Calendar size={12} /> {new Date(post.publishedAt).toLocaleDateString('cs-CZ')}</span>
            {/* OPRAVA: Odstraněno 'italic' u jména autora */}
            <span className="flex items-center gap-2 text-neutral-400 font-black">Marek Verťat</span>
          </div>

          {/* TITULEK: Odstraněno 'italic' pro čistý, masivní vzhled */}
          <h1 className="text-4xl md:text-7xl font-black mb-12 uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
            {post.title}
          </h1>

          <div className="rich-text-content border-t border-white/5 pt-12">
            {post.body && <PortableText value={post.body} components={ptComponents} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getPosts, urlFor } from '../lib/sanity';
import { Post } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pt-32 pb-16 px-6 md:px-12 lg:px-24"
      >
        {/* OPRAVENO: Změna z "Poznámky" na "Blog" */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
          Blog
        </h1>
        <p className="text-neutral-500 max-w-2xl text-lg md:text-xl font-medium leading-tight opacity-80">
          Myšlenky o designu, technologiích a tvůrčím procesu.
        </p>
      </motion.div>

      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative flex flex-col bg-[#181818] rounded-md overflow-hidden shadow-2xl"
            >
              <Link to={`/blog/${post.slug.current}`} className="block">
                <div className="aspect-video relative overflow-hidden bg-neutral-900">
                  {post.mainImage && (
                    <img 
                      src={urlFor(post.mainImage).url()} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3 text-[10px] font-black tracking-widest text-red-600 uppercase">
                    <span>Článek</span>
                    <span className="text-neutral-600">•</span>
                    <time className="text-neutral-400">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('cs-CZ') : 'Nedávno'}
                    </time>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white mb-3 uppercase tracking-tight group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 font-medium">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-white font-black text-xs uppercase tracking-tighter group-hover:gap-4 transition-all">
                    Číst více <span className="text-red-600">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
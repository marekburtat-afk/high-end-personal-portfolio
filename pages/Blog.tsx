import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPosts } from '../lib/sanity';
import { Post } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div className="pt-12 max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-20 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Poznámky</h1>
        <p className="text-neutral-500">Myšlenky o designu, technologiích a procesu.</p>
      </motion.div>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group block py-8 border-b border-neutral-900 hover:border-neutral-700 transition-colors cursor-pointer"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
                <h2 className="text-xl md:text-2xl font-medium group-hover:translate-x-2 transition-transform duration-300">
                    {post.title}
                </h2>
                <time className="text-sm font-mono text-neutral-600 flex-shrink-0">
                    {new Date(post.publishedAt).toLocaleDateString('cs-CZ')}
                </time>
            </div>
            <p className="text-neutral-500 mt-2 md:max-w-xl group-hover:text-neutral-400 transition-colors">
                {post.excerpt}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
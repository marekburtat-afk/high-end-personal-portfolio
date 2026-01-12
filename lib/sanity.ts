import { createClient } from '@sanity/client';
import { Project, Post } from '../types';

// CONFIGURATION
const SANITY_PROJECT_ID = 'pt005391'; // Placeholder ID (must be lowercase alphanumeric)
const SANITY_DATASET = 'production';
const USE_MOCK_DATA = true; // Set to FALSE when you connect real Sanity

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
});

// Helper for image URLs (basic fallback for mock)
export const urlFor = (source: any) => {
    if (USE_MOCK_DATA && typeof source === 'string') return source;
    // In real app, use @sanity/image-url builder here
    return source?.asset?._ref || 'https://picsum.photos/800/600';
};

// --- API CALLS ---

export async function getProjects(): Promise<Project[]> {
  if (USE_MOCK_DATA) {
    return [
      {
        _id: '1',
        _createdAt: new Date().toISOString(),
        title: 'Neon E-Commerce',
        slug: { current: 'neon-ecommerce' },
        description: 'Futuristic shopping experience built with Next.js 14 and WebGL elements.',
        mainImage: { _type: 'image', asset: { _ref: 'https://picsum.photos/seed/neon/800/600', _type: 'reference' } },
        category: 'web'
      },
      {
        _id: '2',
        _createdAt: new Date().toISOString(),
        title: 'Cinematic Reel 2024',
        slug: { current: 'showreel-2024' },
        description: 'A compilation of motion graphics and video editing work.',
        videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // Dummy link
        mainImage: { _type: 'image', asset: { _ref: 'https://picsum.photos/seed/video/800/600', _type: 'reference' } },
        category: 'video'
      },
      {
        _id: '3',
        _createdAt: new Date().toISOString(),
        title: 'Architecture Portfolio',
        slug: { current: 'arch-portfolio' },
        description: 'Minimalist design system for a leading architecture firm.',
        mainImage: { _type: 'image', asset: { _ref: 'https://picsum.photos/seed/arch/800/600', _type: 'reference' } },
        category: 'design'
      },
      {
        _id: '4',
        _createdAt: new Date().toISOString(),
        title: 'FinTech Dashboard',
        slug: { current: 'fintech-dash' },
        description: 'Real-time data visualization platform for financial markets.',
        mainImage: { _type: 'image', asset: { _ref: 'https://picsum.photos/seed/fintech/800/600', _type: 'reference' } },
        category: 'web'
      }
    ];
  }
  return client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
}

export async function getPosts(): Promise<Post[]> {
  if (USE_MOCK_DATA) {
    return [
      {
        _id: '101',
        _createdAt: new Date().toISOString(),
        title: 'Switching to Cursor IDE',
        slug: { current: 'switching-cursor' },
        publishedAt: '2023-10-15T12:00:00Z',
        excerpt: 'Why AI-integrated coding is the future of development workflow.',
      },
      {
        _id: '102',
        _createdAt: new Date().toISOString(),
        title: 'The Art of Whitespace',
        slug: { current: 'art-whitespace' },
        publishedAt: '2023-11-02T12:00:00Z',
        excerpt: 'How negative space guides user attention and creates luxury aesthetics.',
      }
    ];
  }
  return client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
}

export async function getProject(slug: string): Promise<Project | null> {
    if (USE_MOCK_DATA) {
        const projects = await getProjects();
        return projects.find(p => p.slug.current === slug) || null;
    }
    return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}
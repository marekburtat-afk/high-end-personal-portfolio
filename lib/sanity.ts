import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'; // Oficiální builder
import { Project, Post } from '../types';

// CONFIGURATION
const SANITY_PROJECT_ID = '1ycy3rf5'; 
const SANITY_DATASET = 'production';
const USE_MOCK_DATA = false; 

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, 
  apiVersion: '2023-05-03',
});

// Oficiální builder pro URL obrázků
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source || !source.asset) return 'https://picsum.photos/800/600';
  return builder.image(source).url(); // Tohle vytvoří správný odkaz automaticky
}

// --- API CALLS ---

export async function getProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
}

export async function getProject(slug: string): Promise<Project | null> {
    return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}
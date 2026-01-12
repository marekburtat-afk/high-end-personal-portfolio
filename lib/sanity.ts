import { createClient } from '@sanity/client';
import { Project, Post } from '../types';

// CONFIGURATION
const SANITY_PROJECT_ID = '1ycy3rf5'; // Tvoje skutečné ID ze Sanity
const SANITY_DATASET = 'production';
const USE_MOCK_DATA = false; // VYPNUTO - Teď už web poletí pro ostrá data

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, // Pro okamžité zobrazení změn po publikaci
  apiVersion: '2023-05-03',
});

// Helper for image URLs
export const urlFor = (source: any) => {
    if (!source || !source.asset) return 'https://picsum.photos/800/600';
    
    // Zde se skládá URL adresa obrázku přímo ze Sanity úložiště
    const ref = source.asset._ref;
    if (!ref) return 'https://picsum.photos/800/600';
    
    const parts = ref.split('-');
    const id = parts[1];
    const dimensions = parts[2];
    const extension = parts[3];
    
    return `https://cdn.sanity.io/images/${SANITY_PROJECT_ID}/${SANITY_DATASET}/${id}-${dimensions}.${extension}`;
};

// --- API CALLS ---

export async function getProjects(): Promise<Project[]> {
  // Teď už se ptáme přímo tvojí databáze
  return client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
}

export async function getProject(slug: string): Promise<Project | null> {
    return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}
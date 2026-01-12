import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Project, Post } from '../types';

const SANITY_PROJECT_ID = '1ycy3rf5'; 
const SANITY_DATASET = 'production';

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  useCdn: false, 
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  // Pokud obrázek neexistuje, vrátíme prázdný řetězec, aby web nespadl
  if (!source || !source.asset) {
    return '';
  }
  // Oficiální Sanity cesta pro vygenerování URL
  return builder.image(source).url();
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
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
  if (!source || !source.asset) return '';
  return builder.image(source).url();
}

// --- API CALLS ---

// Nová funkce pro načtení statického pozadí
export async function getHeroData() {
  return client.fetch(`*[_type == "project" && isHero == true][0]`);
}

// Funkce pro načtení partnerů a referencí (Loga + Popis)
export async function getPartners() {
  return await client.fetch(`*[_type == "partner"]{
    name,
    "logo": logo.asset->url,
    description
  }`);
}

export async function getProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project" && (isHero != true || !defined(isHero))] | order(_createdAt desc)`);
}

export async function getPosts(): Promise<Post[]> {
  return client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
}

export async function getProject(slug: string): Promise<Project | null> {
    return client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug });
}
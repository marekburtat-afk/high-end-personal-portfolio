import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Project, Post } from '../types';

export const client = createClient({
  projectId: '1ycy3rf5',
  dataset: 'production',
  useCdn: false, 
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

// OPRAVA: Funkce nyní vrací builder, aby šlo nastavovat .width() atd.
export function urlFor(source: any) {
  return builder.image(source);
}

export async function getHeroData() {
  return client.fetch(`*[_type == "project" && isHero == true][0]`);
}

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

// OPRAVA: Přidán explicitní fetch pro "content"
export async function getProject(slug: string): Promise<Project | null> {
    return client.fetch(`*[_type == "project" && slug.current == $slug][0]{
      ...,
      content[] {
        ...,
        _type == "imageWithCaption" => {
          ...,
          asset->
        },
        _type == "beforeAfterSlider" => {
          beforeImage { asset-> },
          afterImage { asset-> }
        }
      }
    }`, { slug });
}
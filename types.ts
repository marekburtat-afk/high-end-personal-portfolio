export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  description: string;
  content?: any;
  mainImage?: SanityImage;
  videoUrl?: string;
  category?: string;
  
  // NOVÁ POLE: Netflix metadata a nastavení
  match?: number;      // Procentuální shoda (např. 98)
  year?: string;       // Rok projektu
  quality?: string;    // Kvalita (4K, HD...)
  output?: string;     // Tvůj nový "Výstup" (Online, Socky, Film...)
  isHero?: boolean;    // Přepínač pro hlavní video na úvodní stránce
  
  // PŘIDÁNO: Přepínač pro připnutí na první 4 pozice
  pinned?: boolean;    
}

export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body?: any;
  mainImage?: SanityImage;
}
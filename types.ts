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
  
  // METADATA: Čistý design bez kalendáře
  year?: string;       // Klasický rok projektu jako text
  quality?: string;    // Kvalita (4K, HD...)
  output?: string;     // Výstup (Online, Socky, Film...)
  isHero?: boolean;    // Přepínač pro hlavní video
  
  // ŘAZENÍ: Manuální kontrola
  pinPosition?: number; // Pozice Pin #1 až #4
  orderRank?: string;   // NOVÉ: Pole pro manuální drag-and-drop řazení
  
  match?: number;      // Ponecháno jako skryté pozůstatky
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
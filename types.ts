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
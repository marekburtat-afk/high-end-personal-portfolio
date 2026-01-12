export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface Project {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  description: string; // Used for listing
  content?: any; // Portable Text for details
  mainImage?: SanityImage;
  videoUrl?: string; // YouTube or Vimeo link
  category?: string;
}

export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  excerpt: string;
  body?: any;
  mainImage?: SanityImage;
}
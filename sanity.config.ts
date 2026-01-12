import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

// 1. Pomocné objekty pro bohatý obsah článku
const imageWithCaption = {
  name: 'imageWithCaption',
  title: 'Obrázek s popiskem',
  type: 'image',
  options: { hotspot: true },
  fields: [
    {
      name: 'caption',
      type: 'string',
      title: 'Popisek obrázku',
      description: 'Zobrazí se pod fotkou v článku',
    },
    {
      name: 'alt',
      type: 'string',
      title: 'Alternativní text',
      validation: (Rule: any) => Rule.required(),
    }
  ]
};

const videoEmbed = {
  name: 'videoEmbed',
  title: 'Video (YouTube/Vimeo)',
  type: 'object',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'URL videa',
      description: 'Vložte odkaz na video (např. z YouTube)'
    }
  ]
};

const beforeAfterSlider = {
  name: 'beforeAfterSlider',
  title: 'Before & After Slider',
  type: 'object',
  fields: [
    {
      name: 'beforeImage',
      title: 'Obrázek PŘED',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'afterImage',
      title: 'Obrázek PO',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    }
  ]
};

// 2. Schémata dokumentů
const projectSchema = {
  name: 'project',
  title: 'Práce (Projects)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulek',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isHero',
      title: 'Použít jako Hero video',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Krátký popis',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mainImage',
      title: 'Hlavní obrázek',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text' }]
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
    },
    {
      name: 'content',
      title: 'Detailní obsah',
      type: 'array', 
      of: [
        { type: 'block' }, 
        imageWithCaption, 
        videoEmbed, 
        beforeAfterSlider
      ]
    },
    {
      name: 'category',
      title: 'Kategorie',
      type: 'string',
      options: {
        list: [
          {title: 'Web Development', value: 'web'},
          {title: 'Design', value: 'design'},
          {title: 'Video', value: 'video'},
        ]
      }
    }
  ],
};

const postSchema = {
  name: 'post',
  title: 'Články (Blog)',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titulek',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'publishedAt',
      title: 'Datum zveřejnění',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    },
    {
      name: 'excerpt',
      title: 'Perex',
      type: 'text',
      rows: 2,
    },
    {
      name: 'body',
      title: 'Text článku',
      type: 'array',
      of: [
        { type: 'block' }, 
        imageWithCaption, 
        videoEmbed, 
        beforeAfterSlider
      ]
    },
  ],
};

const partnerSchema = {
  name: 'partner',
  title: 'Partneři a Reference',
  type: 'document',
  fields: [
    { name: 'name', title: 'Název firmy', type: 'string' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Popis', type: 'text' },
  ],
};

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: '1ycy3rf5', 
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: [projectSchema, postSchema, partnerSchema],
  },
});
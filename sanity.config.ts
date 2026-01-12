import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

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
      title: 'Použít jako hlavní video na pozadí (Hero)',
      type: 'boolean',
      description: 'Pokud toto zapneš, projekt se zobrazí jako velké video na úvodní stránce.',
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
      description: 'Zobrazí se v mřížce pod hlavním videem.',
    },
    {
      name: 'mainImage',
      title: 'Hlavní obrázek',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternativní text',
        }
      ]
    },
    {
      name: 'videoUrl',
      title: 'YouTube Video URL',
      type: 'url',
      description: 'Odkaz na YouTube (např. https://www.youtube.com/watch?v=...). Pro video na pozadí je toto nutné.',
    },
    {
      name: 'content',
      title: 'Detailní obsah',
      type: 'array', 
      of: [{type: 'block'}, {type: 'image'}]
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
      of: [{type: 'block'}, {type: 'image'}]
    },
  ],
};

// --- NOVÉ SCHÉMA PRO PARTNERY ---
const partnerSchema = {
  name: 'partner',
  title: 'Partneři a Reference',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Název firmy',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo (PNG bez pozadí)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'description',
      title: 'Popis spolupráce (Zobrazí se po najetí)',
      type: 'text',
      description: 'Např.: "Správa sociálních sítí a reklamní kampaně 2023"',
    },
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
    // PŘIDÁNO partnerSchema do seznamu typů
    types: [projectSchema, postSchema, partnerSchema],
  },
});
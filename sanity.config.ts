import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

/*
  POKYN PRO UŽIVATELE:
  Toto je konfigurační soubor pro Sanity Studio.
  Až budete nastavovat skutečný Sanity projekt, tento kód definuje strukturu dat.
*/

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
      description: 'Zobrazí se v mřížce na úvodní stránce.',
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
      title: 'Odkaz na Video',
      type: 'url',
      description: 'YouTube nebo Vimeo odkaz (pokud je vyplněn, má přednost před fotkou v detailu).',
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

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: '1ycy3rf5', 
  dataset: 'production',
  basePath: '/studio', // <--- TENTO ŘÁDEK TAM MUSÍŠ PŘIDAT!
  plugins: [deskTool()],
  schema: {
    types: [projectSchema, postSchema],
  },
});
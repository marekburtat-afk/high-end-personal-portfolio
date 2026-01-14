import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

const imageWithCaption = {
  name: 'imageWithCaption',
  type: 'image',
  title: 'Obrázek s popiskem',
  options: { hotspot: true },
  fields: [
    { name: 'caption', type: 'string', title: 'Popisek' }, 
    { name: 'alt', type: 'string', title: 'Alt' },
    {
      name: 'alignment',
      type: 'string',
      title: 'Zarovnání',
      options: {
        list: [
          { title: 'Na celou šířku', value: 'full' },
          { title: 'Vlevo (obtékání textem)', value: 'left' },
          { title: 'Vpravo (obtékání textem)', value: 'right' },
        ],
      },
      initialValue: 'full',
    }
  ]
};

const videoEmbed = {
  name: 'videoEmbed',
  type: 'object',
  title: 'Video',
  fields: [{ name: 'url', type: 'url', title: 'URL' }]
};

const beforeAfterSlider = {
  name: 'beforeAfterSlider',
  type: 'object',
  title: 'Before/After',
  fields: [
    { name: 'beforeImage', type: 'image', title: 'Před' },
    { name: 'afterImage', type: 'image', title: 'Po' },
    {
      name: 'alignment',
      type: 'string',
      title: 'Zarovnání',
      options: {
        list: [
          { title: 'Na celou šířku', value: 'full' },
          { title: 'Vlevo (obtékání textem)', value: 'left' },
          { title: 'Vpravo (obtékání textem)', value: 'right' },
        ],
      },
      initialValue: 'full',
    }
  ]
};

const projectSchema = {
  name: 'project',
  title: 'Projekty',
  type: 'document',
  fields: [
    // NOVÉ: Skryté pole pro manuální řazení (drag-and-drop)
    { name: 'orderRank', type: 'string', hidden: true },

    { name: 'title', type: 'string', title: 'Titulek' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    
    { 
      name: 'pinPosition', 
      type: 'number', 
      title: 'Pozice připnutí (Pin)', 
      description: 'Vyber pozici 1-4 pro fixní pořadí. Pokud chceš řadit úplně manuálně v seznamu, nech zde 0.',
      options: {
        list: [
          { title: 'Bez pinu', value: 0 },
          { title: 'Pin #1 (První)', value: 1 },
          { title: 'Pin #2', value: 2 },
          { title: 'Pin #3', value: 3 },
          { title: 'Pin #4', value: 4 },
        ],
      },
      initialValue: 0
    },

    { name: 'description', type: 'text', title: 'Popis' },
    { name: 'mainImage', type: 'image', title: 'Hlavní foto' },
    { name: 'videoUrl', type: 'url', title: 'Video URL' },
    { 
      name: 'isHero', 
      type: 'boolean', 
      title: 'Hlavní projekt (Hero)', 
      initialValue: false 
    },

    // VRÁCENO ZPĚT: Obyčejné textové pole pro Rok
    { name: 'year', type: 'string', title: 'Rok projektu', initialValue: '2026' },

    { name: 'quality', type: 'string', title: 'Kvalita (např. 4K Ultra HD)', initialValue: '4K Ultra HD' },
    { 
      name: 'output', 
      type: 'string', 
      title: 'Výstup (např. Online, Socky, Film)', 
      initialValue: 'Online' 
    },
    { 
      name: 'category', 
      type: 'string', 
      title: 'Žánr projektu',
      options: {
        list: [
          { title: 'VFX a Motion Graphics', value: 'vfx' },
          { title: 'Reklamní kampaně', value: 'reklama' },
        ],
        layout: 'radio'
      }
    },
    { name: 'content', type: 'array', title: 'Obsah', of: [{ type: 'block' }, imageWithCaption, videoEmbed, beforeAfterSlider] },
    { name: 'match', type: 'number', title: 'Procento shody', hidden: true },
  ]
};

const postSchema = {
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Titulek' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    { name: 'mainImage', type: 'image', title: 'Hlavní obrázek', options: { hotspot: true } },
    { 
      name: 'publishedAt', 
      type: 'datetime', 
      title: 'Datum publikace',
      initialValue: (new Date()).toISOString()
    },
    { name: 'excerpt', type: 'text', title: 'Krátký výtah', rows: 3 },
    { name: 'body', type: 'array', title: 'Text článku', of: [{ type: 'block' }, imageWithCaption, videoEmbed, beforeAfterSlider] }
  ]
};

const settingsSchema = {
  name: 'settings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    { name: 'contactPhoto', type: 'image', title: 'Moje fotka (Kontakt)', options: { hotspot: true } },
    {
      name: 'introVideo',
      type: 'file',
      title: 'Intro Video (MP4/WebM)',
      options: { accept: 'video/*' }
    }
  ]
};

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: '1ycy3rf5',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()], // Zde v budoucnu přidáme Orderable List Structure
  schema: { 
    types: [
      projectSchema, 
      postSchema, 
      settingsSchema, 
      { 
        name: 'partner', 
        title: 'Partneři', 
        type: 'document', 
        fields: [{ name: 'name', type: 'string' }, { name: 'logo', type: 'image' }, { name: 'description', type: 'text' }] 
      }
    ] 
  },
});
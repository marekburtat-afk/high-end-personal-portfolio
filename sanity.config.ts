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
    // NOVÉ POLE: Zarovnání pro obtékání textem
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
    { name: 'afterImage', type: 'image', title: 'Po' }
  ]
};

const projectSchema = {
  name: 'project',
  title: 'Projekty',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Titulek' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    { name: 'description', type: 'text', title: 'Popis' },
    { name: 'mainImage', type: 'image', title: 'Hlavní foto' },
    { name: 'videoUrl', type: 'url', title: 'Video URL' },
    
    { name: 'match', type: 'number', title: 'Procento shody (např. 98)', initialValue: 98 },
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
  ]
};

const postSchema = {
  name: 'post',
  title: 'Blog',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Titulek' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    { name: 'body', type: 'array', title: 'Text', of: [{ type: 'block' }, imageWithCaption, videoEmbed, beforeAfterSlider] }
  ]
};

const settingsSchema = {
  name: 'settings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    { 
      name: 'contactPhoto', 
      type: 'image', 
      title: 'Moje fotka (Kontakt)',
      options: { hotspot: true }
    }
  ]
};

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: '1ycy3rf5',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
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
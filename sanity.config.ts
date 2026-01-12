import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

const imageWithCaption = {
  name: 'imageWithCaption',
  type: 'image',
  title: 'Obrázek s popiskem',
  options: { hotspot: true },
  fields: [{ name: 'caption', type: 'string', title: 'Popisek' }, { name: 'alt', type: 'string', title: 'Alt' }]
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
    { name: 'content', type: 'array', title: 'Obsah', of: [{ type: 'block' }, imageWithCaption, videoEmbed, beforeAfterSlider] },
    { name: 'category', type: 'string', title: 'Kategorie' }
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

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: '1ycy3rf5',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: { types: [projectSchema, postSchema, { name: 'partner', title: 'Partneři', type: 'document', fields: [{ name: 'name', type: 'string' }, { name: 'logo', type: 'image' }, { name: 'description', type: 'text' }] }] },
});
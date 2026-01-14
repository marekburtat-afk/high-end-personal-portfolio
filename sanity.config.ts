import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';

// --- POMOCNÁ SCHÉMATA (Musí mít definované 'name', aby se na ně dalo odkazovat) ---

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
  fields: [
    { name: 'url', type: 'url', title: 'YouTube URL' },
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

const mediaGrid = {
  name: 'mediaGrid',
  type: 'object',
  title: 'Mřížka médií (Vedle sebe)',
  fields: [
    {
      name: 'items',
      type: 'array',
      title: 'Položky v mřížce',
      // Odkazujeme na zaregistrované typy níže
      of: [{ type: 'imageWithCaption' }, { type: 'videoEmbed' }],
      options: { layout: 'grid' }
    },
    {
      name: 'columns',
      type: 'number',
      title: 'Počet sloupců',
      options: { list: [2, 3] },
      initialValue: 2
    }
  ]
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

const gallery = {
  name: 'gallery',
  type: 'object',
  title: 'Galerie / Koláž',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Obrázky v galerii',
      of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'caption', type: 'string', title: 'Popisek' }] }],
      options: { layout: 'grid' }
    },
    {
      name: 'columns',
      type: 'number',
      title: 'Počet sloupců (desktop)',
      initialValue: 3,
      options: { list: [2, 3, 4] }
    }
  ]
};

// --- HLAVNÍ DOKUMENTY ---

const projectSchema = {
  name: 'project',
  title: 'Projekty',
  type: 'document',
  fields: [
    { name: 'orderRank', type: 'string', hidden: true },
    { name: 'title', type: 'string', title: 'Titulek' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title', maxLength: 96 } },
    { 
      name: 'pinPosition', 
      type: 'number', 
      title: 'Pozice připnutí (Pin)', 
      options: {
        list: [
          { title: 'Bez pinu', value: 0 },
          { title: 'Pin #1', value: 1 },
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
    { name: 'isHero', type: 'boolean', title: 'Hlavní projekt (Hero)', initialValue: false },
    { name: 'year', type: 'string', title: 'Rok projektu', initialValue: '2026' },
    { name: 'quality', type: 'string', title: 'Kvalita', initialValue: '4K Ultra HD' },
    { name: 'output', type: 'string', title: 'Výstup', initialValue: 'Online' },
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
    { 
      name: 'content', 
      type: 'array', 
      title: 'Obsah', 
      of: [{ type: 'block' }, { type: 'imageWithCaption' }, { type: 'videoEmbed' }, { type: 'mediaGrid' }, { type: 'beforeAfterSlider' }, { type: 'gallery' }] 
    },
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
    { name: 'publishedAt', type: 'datetime', title: 'Datum publikace', initialValue: (new Date()).toISOString() },
    { name: 'excerpt', type: 'text', title: 'Krátký výtah', rows: 3 },
    { name: 'body', type: 'array', title: 'Text článku', of: [{ type: 'block' }, { type: 'imageWithCaption' }, { type: 'videoEmbed' }, { type: 'mediaGrid' }, { type: 'beforeAfterSlider' }, { type: 'gallery' }] }
  ]
};

const settingsSchema = {
  name: 'settings',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    { name: 'contactPhoto', type: 'image', title: 'Moje fotka (Kontakt)', options: { hotspot: true } },
    { name: 'introVideo', type: 'file', title: 'Intro Video (MP4/WebM)', options: { accept: 'video/*' } }
  ]
};

// --- KONFIGURACE ---

export default defineConfig({
  name: 'default',
  title: 'Portfolio Studio',
  projectId: '1ycy3rf5',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Obsah')
          .items([
            orderableDocumentListDeskItem({
              type: 'project',
              title: 'Projekty (Manuální řazení)',
              S,
              context,
            }),
            S.divider(),
            S.documentTypeListItem('post').title('Blog'),
            S.documentTypeListItem('partner').title('Partneři'),
            S.documentListItem().schemaType('settings').id('settings').title('Nastavení webu'),
          ]),
    }),
  ],
  schema: { 
    types: [
      // HLAVNÍ DOKUMENTY
      projectSchema,
      postSchema, 
      settingsSchema, 
      { 
        name: 'partner', 
        title: 'Partneři', 
        type: 'document', 
        fields: [{ name: 'name', type: 'string' }, { name: 'logo', type: 'image' }, { name: 'description', type: 'text' }] 
      },
      // TADY REGISTRUJEME POMOCNÉ TYPY (Tím zmizí chyby Unknown type)
      imageWithCaption,
      videoEmbed,
      mediaGrid,
      beforeAfterSlider,
      gallery
    ] 
  },
});
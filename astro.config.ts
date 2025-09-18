import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import lottie from "astro-integration-lottie";
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import embeds from 'astro-embed/integration';
import remarkGfm from 'remark-gfm';
import markedFootnote from 'marked-footnote';
import type { AstroIntegration } from 'astro';
import remarkDirective from 'remark-directive';
import remarkToc from 'remark-toc';
import MyNote from './src/utils/my-note-plugin';


import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

import svelte from '@astrojs/svelte';

import netlify from '@astrojs/netlify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'server',
  integrations: [tailwind({
    applyBaseStyles: false,
  }), sitemap(), embeds(), mdx(), lottie(), icon({
    include: {
      tabler: ['*'],
      'flat-color-icons': [
        'template',
        'gallery',
        'approval',
        'document',
        'advertising',
        'currency-exchange',
        'voice-presentation',
        'business-contact',
        'database',
      ],
    },
  }), ...whenExternalScripts(() =>
    partytown({
      config: { forward: ['dataLayer.push'] },
    })
  ), compress({
    CSS: true,
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: false,
      },
    },
    Image: false,
    JavaScript: true,
    SVG: false,
    Logger: 1,
  }), astrowind({
    config: './src/config.yaml',
  }), svelte()],
  actions: true,
  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    shikiConfig: {
      theme: 'dracula'
    },
    remarkPlugins: [readingTimeRemarkPlugin, remarkDirective,MyNote],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },

  adapter: netlify({
    edgeMiddleware: true
  }),
});
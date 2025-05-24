import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeKatex],
    remarkPlugins: [remarkMath],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
  site: 'https://progress.rip',
});

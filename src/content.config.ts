import { defineCollection, z } from 'astro:content'; // eslint-disable-line
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/posts', pattern: '**/*.md' }),
  schema: z.object({
    publishDate: z.string(),
    tags: z.array(z.string()),
    title: z.string(),
    updateDate: z.string(),
  }),
});

export const collections = { blog };

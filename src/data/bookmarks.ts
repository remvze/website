import { reverseArray } from '@/helpers/array';

/**
 * From Old to New
 * YYYY-MM-DD
 */

const _bookmarks: Array<{
  date: string;
  title: string;
  type: 'video' | 'article' | 'other';
  url: string;
}> = [
  {
    date: '2025-07-14',
    title: 'Readme Driven Development',
    type: 'article',
    url: 'https://tom.preston-werner.com/2010/08/23/readme-driven-development',
  },
  {
    date: '2025-07-14',
    title: "Conway's Law",
    type: 'article',
    url: 'https://en.wikipedia.org/wiki/Conway%27s_law',
  },
];

export const bookmarks = reverseArray(_bookmarks);

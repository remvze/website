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
    date: '2025-09-03',
    title: 'Self Education: Your Best Defense Against Brain Rot',
    type: 'video',
    url: 'https://youtu.be/KiwIqjcgSQw',
  },
  {
    date: '2025-09-03',
    title: 'The Terrible Paradox of Self-Awareness | Fernando Pessoa',
    type: 'video',
    url: 'https://youtu.be/6qU1sDBU9Cs',
  },
  {
    date: '2025-09-03',
    title: 'The Desire to Be Sad',
    type: 'video',
    url: 'https://youtu.be/cMtZvEfg2Mg',
  },
  {
    date: '2025-09-03',
    title: 'How to Test Your Emotional Maturity',
    type: 'video',
    url: 'https://youtu.be/tz7zxh9Bfow',
  },
];

export const bookmarks = reverseArray(_bookmarks);

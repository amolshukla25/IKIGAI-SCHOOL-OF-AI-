import type { Metadata } from 'next';
import StoriesClient from './StoriesClient';

export const metadata: Metadata = {
  title: 'Stories & Insights | AI, Data Science & Digital Marketing Blog — Ikigai Ludhiana',
  description:
    'Read the latest articles on AI courses in Ludhiana, data science careers, digital marketing strategies, influencer marketing tips, and career guides from Ikigai School of AI.',
  keywords: [
    'ai blog ludhiana',
    'data science articles ludhiana',
    'digital marketing blog ludhiana',
    'ikigai ludhiana blog',
    'ai course ludhiana guide',
    'tech education ludhiana',
  ],
  alternates: {
    canonical: 'https://www.ikigailudhiana.com/stories',
  },
  openGraph: {
    title: 'Stories & Insights | Ikigai School of AI, Ludhiana',
    description: 'Expert articles on AI, Data Science, Digital Marketing, and Influencer Marketing from Ludhiana\'s premier training institute.',
    url: 'https://www.ikigailudhiana.com/stories',
    type: 'website',
  },
};

export default function StoriesPage() {
  return <StoriesClient />;
}

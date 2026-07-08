import type { Metadata } from 'next';
import DataScienceClient from './DataScienceClient';

export const metadata: Metadata = {
  title: 'Best Data Science Course in Ludhiana | 6-Month Professional Program',
  description:
    'Join Ludhiana\'s best Data Science course at Ikigai School of AI. Learn Python, Machine Learning, Deep Learning, and GenAI with end-to-end capstone projects, industry certification, and placement support.',
  keywords: [
    'data science course ludhiana',
    'data science training ludhiana',
    'machine learning course ludhiana',
    'python course ludhiana',
    'best data science institute ludhiana',
    'data analytics course ludhiana',
    'ai ml course ludhiana',
    'data science classes ludhiana',
  ],
  alternates: {
    canonical: 'https://www.ikigailudhiana.com/programs/data-science',
  },
  openGraph: {
    title: 'Data Science Course in Ludhiana | Ikigai School of AI',
    description:
      'Master Python, ML, Deep Learning & GenAI with live projects. 6-month professional Data Science course in Ludhiana with placement support.',
    url: 'https://www.ikigailudhiana.com/programs/data-science',
    type: 'website',
  },
};

export default function DataSciencePage() {
  return <DataScienceClient />;
}

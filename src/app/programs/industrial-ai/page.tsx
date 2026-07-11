import type { Metadata } from 'next';
import IndustrialAIClient from './IndustrialAIClient';

export const metadata: Metadata = {
  title: 'Industrial AI Fellowship in Ludhiana | Paid Internships & PPO Support',
  description:
    'Join the Industrial AI Fellowship at Ikigai Ludhiana. Developed with Algo8 AI, this 6-8 month program covers predictive maintenance, IIoT, and AI system deployments. Paid internships (up to ₹15K/month) and direct PPO pathway.',
  keywords: [
    'industrial ai course ludhiana',
    'algo8 ai fellowship ludhiana',
    'predictive maintenance course ludhiana',
    'machine learning deployment training',
    'iot and ai course punjab',
  ],
  alternates: {
    canonical: 'https://www.ikigailudhiana.com/programs/industrial-ai',
  },
  openGraph: {
    title: 'Industrial AI Fellowship in Ludhiana | Algo8 AI',
    description: 'Master predictive maintenance, IIoT, and ML deployment. Paid internship up to ₹15K/month and PPO pathway.',
    url: 'https://www.ikigailudhiana.com/programs/industrial-ai',
    type: 'website',
  },
};

export default function IndustrialAIPage() {
  return <IndustrialAIClient />;
}

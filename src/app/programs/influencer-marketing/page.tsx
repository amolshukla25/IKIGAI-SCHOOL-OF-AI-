import type { Metadata } from 'next';
import InfluencerMarketingClient from './InfluencerMarketingClient';
import { CourseJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Best Influencer Marketing Course in Ludhiana | Content Creation & Brand Growth',
  description:
    'Learn Influencer Marketing in Ludhiana at Ikigai School of AI. Master personal branding, content creation, Instagram & YouTube growth, brand collaborations, and monetization strategies. 6-month professional course with placement support.',
  keywords: [
    'influencer marketing course ludhiana',
    'influencer course ludhiana',
    'content creation course ludhiana',
    'instagram marketing course ludhiana',
    'youtube course ludhiana',
    'social media influencer training ludhiana',
    'personal branding course ludhiana',
    'best influencer marketing institute ludhiana',
  ],
  alternates: {
    canonical: 'https://www.ikigailudhiana.com/programs/influencer-marketing',
  },
  openGraph: {
    title: 'Influencer Marketing Course in Ludhiana | Ikigai School of AI',
    description:
      'Master personal branding, content creation, and monetization. Learn Instagram, YouTube & brand collaboration strategies. 6-month course in Ludhiana.',
    url: 'https://www.ikigailudhiana.com/programs/influencer-marketing',
    type: 'website',
  },
};

export default function InfluencerMarketingPage() {
  return (
    <>
      <CourseJsonLd
        name="Influencer Marketing Course in Ludhiana"
        description="Learn influencer marketing in Ludhiana — personal branding, content creation, Instagram & YouTube growth, brand collaborations, and monetization strategies."
        url="/programs/influencer-marketing"
        duration="P6M"
      />
      <InfluencerMarketingClient />
    </>
  );
}

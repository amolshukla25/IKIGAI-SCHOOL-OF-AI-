import type { Metadata } from 'next';
import DigitalMarketingClient from './DigitalMarketingClient';
import { CourseJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Best Digital Marketing Course in Ludhiana | 6-Month Professional Program',
  description:
    'Enroll in Ludhiana\'s best Digital Marketing course at Ikigai School of AI. Learn Google Ads, Meta Ads, SEO, content marketing, and influencer strategies with live campaigns and placement support. 6-month professional program.',
  keywords: [
    'digital marketing course ludhiana',
    'digital marketing training ludhiana',
    'best digital marketing institute ludhiana',
    'google ads course ludhiana',
    'seo course ludhiana',
    'social media marketing ludhiana',
    'online marketing course ludhiana',
    'digital marketing classes ludhiana',
  ],
  alternates: {
    canonical: 'https://www.ikigailudhiana.com/programs/digital-marketing',
  },
  openGraph: {
    title: 'Digital Marketing Course in Ludhiana | Ikigai School of AI',
    description:
      'Master Google Ads, Meta Ads, SEO, and content marketing with live campaigns. 6-month professional course in Ludhiana with placement assistance.',
    url: 'https://www.ikigailudhiana.com/programs/digital-marketing',
    type: 'website',
  },
};

export default function DigitalMarketingPage() {
  return (
    <>
      <CourseJsonLd
        name="Digital Marketing Course in Ludhiana"
        description="6-month professional Digital Marketing course in Ludhiana covering Google Ads, Meta Ads, SEO, content marketing, and live campaigns with placement assistance."
        url="/programs/digital-marketing"
        duration="P6M"
      />
      <DigitalMarketingClient />
    </>
  );
}

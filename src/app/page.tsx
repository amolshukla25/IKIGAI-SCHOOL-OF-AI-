import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { HomepageJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Ikigai School of AI Ludhiana | AI, Data Science, Digital Marketing & Influencer Marketing Courses',
  description:
    'Ikigai School of AI is Ludhiana\'s #1 institute for AI courses, Data Science, Digital Marketing & Influencer Marketing. IIT Kanpur certified fellowships with paid internships, placement support up to ₹9 LPA. Enroll now!',
  alternates: {
    canonical: 'https://www.ikigailudhiana.com',
  },
};

export default function Home() {
  return (
    <>
      <HomepageJsonLd />
      <HomeClient />
    </>
  );
}

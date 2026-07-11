import type { Metadata } from 'next';
import AIBuilderClient from './AIBuilderClient';
import { CourseJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'AI Builder Fellowship in Ludhiana | IIT Kanpur Certified Course',
  description:
    'Enroll in the 8-month AI Builder Fellowship at Ikigai Ludhiana. Get certified by E&ICT Academy IIT Kanpur, build GenAI/LLM apps, earn a ₹45K stipend during paid internships, and unlock ₹9 LPA placements.',
  keywords: [
    'ai builder fellowship ludhiana',
    'best ai course ludhiana',
    'artificial intelligence course ludhiana',
    'iit kanpur certified course ludhiana',
    'genai course ludhiana',
    'ai training in punjab',
  ],
  alternates: {
    canonical: 'https://www.ikigailudhiana.com/programs/ai-builder',
  },
  openGraph: {
    title: 'AI Builder Fellowship in Ludhiana | IIT Kanpur Certified',
    description: 'IIT Kanpur certified AI course with GenAI & LLM training. ₹45K stipend, paid internship, and placement support.',
    url: 'https://www.ikigailudhiana.com/programs/ai-builder',
    type: 'website',
  },
};

export default function AIBuilderPage() {
  return (
    <>
      <CourseJsonLd
        name="AI Builder Fellowship — Best AI Course in Ludhiana"
        description="8-month AI Builder Fellowship in Ludhiana with IIT Kanpur certification, GenAI & LLM training, ₹45K stipend, and placement support. Powered by SapienOne."
        url="/programs/ai-builder"
        provider="SapienOne + IIT Kanpur"
        duration="P8M"
      />
      <AIBuilderClient />
    </>
  );
}

import React from 'react';

/* ============================================================
   JSON-LD Structured Data for Google Rich Results
   ============================================================ */

const BASE_URL = 'https://www.ikigailudhiana.com';

// ── Organisation + LocalBusiness ────────────────────────────
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': `${BASE_URL}/#organization`,
    name: 'Ikigai School of AI',
    alternateName: 'IKIGAI Ludhiana',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.ico`,
    description:
      'Ikigai School of AI is Ludhiana\'s premier AI, Data Science, Digital Marketing, and Influencer Marketing training institute. IIT Kanpur certified with paid internships and placement support up to ₹9 LPA.',
    telephone: '+91-98765-43210',
    email: 'admissions@ikigai.ai',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'SCO 45, Ferozepur Road',
      addressLocality: 'Ludhiana',
      addressRegion: 'Punjab',
      postalCode: '141001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.9010,
      longitude: 75.8573,
    },
    areaServed: {
      '@type': 'City',
      name: 'Ludhiana',
    },
    sameAs: [
      'https://github.com/amolshukla25/IKIGAI-SCHOOL-OF-AI-',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '₹₹',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '87',
      bestRating: '5',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── WebSite with SearchAction ───────────────────────────────
export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'Ikigai School of AI',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Course Schema (reusable per course) ─────────────────────
interface CourseJsonLdProps {
  name: string;
  description: string;
  url: string;
  provider?: string;
  duration?: string;
  mode?: string;
}

export function CourseJsonLd({ name, description, url, provider = 'Ikigai School of AI', duration = 'P6M', mode = 'Onsite' }: CourseJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: provider,
      url: BASE_URL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Ludhiana',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: mode,
      courseWorkload: duration,
      instructor: {
        '@type': 'Organization',
        name: provider,
      },
      locationCreated: {
        '@type': 'Place',
        name: 'Ikigai School of AI, Ludhiana',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ludhiana',
          addressRegion: 'Punjab',
          addressCountry: 'IN',
        },
      },
    },
    educationalCredentialAwarded: 'Industry Certification',
    inLanguage: 'en',
    isAccessibleForFree: false,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'INR',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── FAQ Schema ──────────────────────────────────────────────
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── BreadcrumbList ──────────────────────────────────────────
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── All Homepage Schema Combined ────────────────────────────
export function HomepageJsonLd() {
  const faqItems: FAQItem[] = [
    {
      question: 'What AI courses are available in Ludhiana?',
      answer:
        'Ikigai School of AI in Ludhiana offers the AI Builder Fellowship (8 months, IIT Kanpur certified), Industrial AI Fellowship (6-8 months with Algo8 AI), and a 6-month Data Science professional course. All programs include hands-on projects, paid internships, and placement support.',
    },
    {
      question: 'What is the best data science course in Ludhiana?',
      answer:
        'Ikigai School of AI offers the best data science course in Ludhiana — a 6-month professional program covering Python, Machine Learning, Deep Learning, and GenAI foundations with live capstone projects and industry certification.',
    },
    {
      question: 'Is there a digital marketing course in Ludhiana with placement?',
      answer:
        'Yes! Ikigai School of AI offers a 6-month Digital Marketing course in Ludhiana with Google Ads, Meta Ads, SEO, content marketing, and live campaigns. The program includes placement assistance and industry certification.',
    },
    {
      question: 'What is the fee for AI course at Ikigai Ludhiana?',
      answer:
        'Ikigai School of AI in Ludhiana offers competitive pricing with EMI options. The AI Builder Fellowship includes a ₹45,000 stipend, and top performers in the Industrial AI Fellowship earn ₹12,000–₹15,000 per month during internship. Contact admissions for detailed fee structure.',
    },
    {
      question: 'Does Ikigai School of AI provide influencer marketing training in Ludhiana?',
      answer:
        'Yes, Ikigai School of AI in Ludhiana offers a specialized Influencer Marketing course covering personal branding, content creation, Instagram & YouTube growth strategies, brand collaborations, and monetization — with live campaign experience.',
    },
    {
      question: 'What certifications do I get from Ikigai School of AI Ludhiana?',
      answer:
        'Students receive E&ICT Academy IIT Kanpur certification for fellowship programs, along with industry-recognized certificates from SapienOne and Algo8 AI. Professional course students receive Ikigai School of AI certification with industry validation.',
    },
    {
      question: 'Where is Ikigai School of AI located in Ludhiana?',
      answer:
        'Ikigai School of AI is located on Ferozepur Road, Ludhiana, Punjab 141001. We also have campus locations in Kanpur and Lucknow. Visit us for a free campus tour and career counseling session.',
    },
    {
      question: 'Do Ikigai courses include paid internships?',
      answer:
        'Yes! The AI Builder Fellowship includes a ₹45,000 program stipend, while the Industrial AI Fellowship provides ₹12,000–₹15,000 per month during the internship phase. Top performers receive PPOs (Pre-Placement Offers) with CTCs up to ₹9 LPA.',
    },
  ];

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <CourseJsonLd
        name="AI Builder Fellowship — Best AI Course in Ludhiana"
        description="8-month AI Builder Fellowship in Ludhiana with IIT Kanpur certification, GenAI & LLM training, ₹45K stipend, and placement support. Powered by SapienOne."
        url="/programs/ai-builder"
        provider="SapienOne + IIT Kanpur"
        duration="P8M"
      />
      <CourseJsonLd
        name="Industrial AI Fellowship — AI Course in Ludhiana"
        description="6-8 month Industrial AI Fellowship in Ludhiana with Algo8 AI. Learn predictive maintenance, IIoT, and ML deployment with paid internship up to ₹15K/month and PPO pathway."
        url="/programs/industrial-ai"
        provider="Algo8 AI"
        duration="P8M"
      />
      <CourseJsonLd
        name="Digital Marketing Course in Ludhiana"
        description="6-month professional Digital Marketing course in Ludhiana covering Google Ads, Meta Ads, SEO, content marketing, and live campaigns with placement assistance."
        url="/programs/digital-marketing"
        duration="P6M"
      />
      <CourseJsonLd
        name="Data Science Course in Ludhiana"
        description="6-month professional Data Science course in Ludhiana covering Python, Machine Learning, Deep Learning, and GenAI with end-to-end capstone projects and placement support."
        url="/programs/data-science"
        duration="P6M"
      />
      <CourseJsonLd
        name="Influencer Marketing Course in Ludhiana"
        description="Learn influencer marketing in Ludhiana — personal branding, content creation, Instagram & YouTube growth, brand collaborations, and monetization strategies."
        url="/programs/influencer-marketing"
        duration="P6M"
      />
      <FAQJsonLd items={faqItems} />
    </>
  );
}

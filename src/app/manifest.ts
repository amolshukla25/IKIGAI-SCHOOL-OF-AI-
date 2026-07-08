import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ikigai School of AI — Ludhiana',
    short_name: 'Ikigai AI',
    description:
      'Best AI, Data Science, Digital Marketing & Influencer Marketing courses in Ludhiana. IIT Kanpur certified with paid internships and placement support.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

import type { MetadataRoute } from 'next';

import { siteDescription, siteName } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: 'Keetman',
    description: siteDescription,
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1919',
    theme_color: '#1a1919',
    icons: [
      { src: '/icon.png', sizes: '224x224', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}

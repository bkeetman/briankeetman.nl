import type { MetadataRoute } from 'next';

import { siteUrl } from '@/lib/seo';
import { isSiteHomePreview } from '@/lib/sitehome-preview';

export default function robots(): MetadataRoute.Robots {
  if (isSiteHomePreview) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

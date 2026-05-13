import type { MetadataRoute } from 'next';

import {
  getPortfolioSlugs,
  getPostSlugs,
  getProjectSlugs,
} from '@/sanity/lib/content';

const siteUrl = 'https://www.briankeetman.nl';

const staticRoutes = ['', '/blog', '/portfolio', '/projects'].map((path) => ({
  url: `${siteUrl}${path}`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: path === '' ? 1 : 0.8,
}));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, portfolioItems, projects] = await Promise.all([
    getPostSlugs(),
    getPortfolioSlugs(),
    getProjectSlugs(),
  ]);

  const postRoutes = posts.map(({ slug }) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const portfolioRoutes = portfolioItems.map(({ slug }) => ({
    url: `${siteUrl}/portfolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projectRoutes = projects.map(({ slug }) => ({
    url: `${siteUrl}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...portfolioRoutes, ...projectRoutes];
}

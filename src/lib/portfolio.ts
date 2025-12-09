import { format } from 'date-fns';
import { nl } from 'date-fns/locale/nl';
import fs from 'fs';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import type { ReactElement } from 'react';

export interface PortfolioItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  client?: string;
  technologies?: string[];
  website?: string;
  content: string;
  mdxContent: ReactElement;
}

const portfolioDirectory = path.join(process.cwd(), 'portfolio');

export function getPortfolioSlugs(): string[] {
  if (!fs.existsSync(portfolioDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(portfolioDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  const fullPath = path.join(portfolioDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const { content: mdxContent } = await compileMDX({
    source: content,
  });

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    image: data.image || undefined,
    client: data.client || undefined,
    technologies: data.technologies || [],
    website: data.website || undefined,
    content,
    mdxContent,
  };
}

export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  const slugs = getPortfolioSlugs();
  const items = await Promise.all(
    slugs.map(async (slug) => {
      const item = await getPortfolioItemBySlug(slug);
      return item;
    })
  );

  // Filter out null values and sort by date (newest first)
  return items
    .filter((item): item is PortfolioItem => item !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
}

export function formatPortfolioDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, 'MMMM yyyy', { locale: nl });
  } catch {
    return dateString;
  }
}

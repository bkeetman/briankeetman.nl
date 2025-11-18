import { format } from 'date-fns';
import { nl } from 'date-fns/locale/nl';
import fs from 'fs';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import path from 'path';
import type { ReactElement } from 'react';

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  image?: string;
  content: string;
  mdxContent: ReactElement;
}

const postsDirectory = path.join(process.cwd(), 'pages');

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((name) => name.replace(/\.mdx$/, ''));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

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
    content,
    mdxContent,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post;
    })
  );

  // Filter out null values and sort by date (newest first)
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
}

export function formatPostDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, 'd MMMM yyyy', { locale: nl });
  } catch {
    return dateString;
  }
}

export function formatRSSDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

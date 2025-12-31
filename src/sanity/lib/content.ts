import { sanityFetch } from './live';
import {
  PORTFOLIO_ITEM_QUERY,
  PORTFOLIO_ITEMS_QUERY,
  PORTFOLIO_SLUGS_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  POST_SLUGS_QUERY,
} from './queries';
import type { PortfolioItem, Post } from '../types';

export async function getPosts(options?: { stega?: boolean }) {
  const data = await sanityFetch<Post[]>({
    query: POSTS_QUERY,
    stega: options?.stega,
    tags: ['post'],
  });
  return data ?? [];
}

export async function getPostBySlug(
  slug: string,
  options?: { stega?: boolean; perspective?: 'published' | 'previewDrafts' }
) {
  const data = await sanityFetch<Post>({
    query: POST_QUERY,
    params: { slug },
    stega: options?.stega,
    perspective: options?.perspective,
    tags: ['post', `post:${slug}`],
  });
  return data;
}

export async function getPostSlugs() {
  const data = await sanityFetch<Array<{ slug: string }>>({
    query: POST_SLUGS_QUERY,
    stega: false,
    perspective: 'published',
  });
  return data ?? [];
}

export async function getPortfolioItems(options?: { stega?: boolean }) {
  const data = await sanityFetch<PortfolioItem[]>({
    query: PORTFOLIO_ITEMS_QUERY,
    stega: options?.stega,
    tags: ['portfolio'],
  });
  return data ?? [];
}

export async function getPortfolioItemBySlug(
  slug: string,
  options?: { stega?: boolean; perspective?: 'published' | 'previewDrafts' }
) {
  const data = await sanityFetch<PortfolioItem>({
    query: PORTFOLIO_ITEM_QUERY,
    params: { slug },
    stega: options?.stega,
    perspective: options?.perspective,
    tags: ['portfolio', `portfolio:${slug}`],
  });
  return data;
}

export async function getPortfolioSlugs() {
  const data = await sanityFetch<Array<{ slug: string }>>({
    query: PORTFOLIO_SLUGS_QUERY,
    stega: false,
    perspective: 'published',
  });
  return data ?? [];
}

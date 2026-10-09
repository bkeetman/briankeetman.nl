import type { QueryParams } from 'next-sanity';

import { client } from './client';

type Perspective = 'published' | 'previewDrafts';

type SanityFetchOptions<TQuery extends string> = {
  query: TQuery;
  params?: QueryParams;
  /**
   * Default: 60s. false keeps the cache until tag-based revalidation.
   */
  revalidate?: number | false;
  /**
   * Set tags to enable tag-based revalidation.
   */
  tags?: string[];
  stega?: boolean;
  perspective?: Perspective;
};

export async function sanityFetch<TResult>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
  stega = true,
  perspective = 'published',
}: SanityFetchOptions<string>) {
  if (process.env.SITEHOME_TEST_PREVIEW === 'true') {
    return client.fetch<TResult>(query, params, {
      perspective: 'published',
      stega: false,
      cache: 'no-store',
    });
  }

  return client.fetch<TResult>(query, params, {
    perspective,
    stega,
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}

// Placeholder for live mode (defineLive is not available in next-sanity v11).
export function SanityLive() {
  return null;
}

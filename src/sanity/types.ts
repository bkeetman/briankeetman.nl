import type { PortableTextBlock } from 'sanity';

export type SanityImageWithMetadata = {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  publishedAt?: string;
  mainImage?: SanityImageWithMetadata;
  body?: PortableTextBlock[];
};

export type PortfolioItem = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  date?: string;
  client?: string;
  technologies?: string[];
  website?: string;
  mainImage?: SanityImageWithMetadata;
  body?: PortableTextBlock[];
};

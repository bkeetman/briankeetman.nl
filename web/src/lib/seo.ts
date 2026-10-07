import type { Metadata } from 'next';

export const siteUrl = 'https://www.briankeetman.nl';
export const siteName = 'Brian Keetman';
export const siteDescription =
  'Full-stack developer & builder uit Tollebeek. Ik ontwerp en bouw websites, webapplicaties en digitale producten, met een praktische aanpak van idee tot livegang.';

type PageMetadataInput = {
  title: string;
  description?: string;
  path: string;
  /** Image URL (absolute or site-relative); omit to use the generated site image. */
  image?: string | null;
  type?: 'website' | 'article';
  publishedTime?: string;
};

/** Title, description, canonical, Open Graph and Twitter tags for one page. */
export function pageMetadata({
  title,
  description = siteDescription,
  path,
  image,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  // Page-level openGraph replaces the inherited one, so point at the generated image explicitly.
  const images = [image ?? '/opengraph-image'];

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName,
      locale: 'nl_NL',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
  };
}

import { defineLocations, type PresentationPluginOptions } from 'sanity/presentation';

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        documentId: doc?._id,
        locations: [
          doc?.slug
            ? {
                title: doc?.title || 'Blogpost',
                href: `/blog/${stegaClean(doc.slug)}`,
              }
            : undefined,
          { title: 'Blog overzicht', href: '/blog' },
        ].filter((location): location is { title: string; href: string } => Boolean(location)),
      }),
    }),
    portfolio: defineLocations({
      select: { title: 'title', slug: 'slug.current' },
      resolve: (doc) => ({
        documentId: doc?._id,
        locations: [
          doc?.slug
            ? {
                title: doc?.title || 'Project',
                href: `/portfolio/${stegaClean(doc.slug)}`,
              }
            : undefined,
          { title: 'Portfolio overzicht', href: '/portfolio' },
        ].filter((location): location is { title: string; href: string } => Boolean(location)),
      }),
    }),
  },
};
import { stegaClean } from '@sanity/client/stega';

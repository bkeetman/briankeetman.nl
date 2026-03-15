import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Korte intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Concept', value: 'concept' },
          { title: 'In bouw', value: 'in-bouw' },
          { title: 'Beta', value: 'beta' },
          { title: 'Live', value: 'live' },
        ],
      },
    }),
    defineField({
      name: 'startedAt',
      title: 'Startdatum',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologieën',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'mainImage',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt-tekst',
          validation: (rule) => rule.max(140),
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'mainImage',
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle:
        subtitle === 'concept'
          ? 'Concept'
          : subtitle === 'in-bouw'
            ? 'In bouw'
            : subtitle === 'beta'
              ? 'Beta'
              : subtitle === 'live'
                ? 'Live'
                : subtitle,
      media,
    }),
  },
  orderings: [
    {
      title: 'Startdatum, nieuw naar oud',
      name: 'startedAtDesc',
      by: [
        { field: 'startedAt', direction: 'desc' },
        { field: '_createdAt', direction: 'desc' },
      ],
    },
  ],
});

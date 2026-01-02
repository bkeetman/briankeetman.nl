import { defineQuery } from 'next-sanity';

const imageFields = /* groq */ `
  mainImage{
    asset->{
      _id,
      "_ref": _id,
      url,
      metadata{
        lqip,
        dimensions{
          width,
          height
        }
      }
    },
    alt,
    hotspot,
    crop
  }
`;

export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      ${imageFields}
    }
`);

export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    body,
    ${imageFields}
  }
`);

export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`);

export const PORTFOLIO_ITEMS_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolio" && defined(slug.current)]
    | order(date desc){
      _id,
      title,
      "slug": slug.current,
      description,
      date,
      client,
      technologies,
      website,
      ${imageFields}
    }
`);

export const PORTFOLIO_ITEM_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolio" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    description,
    date,
    client,
    technologies,
    website,
    body,
    ${imageFields}
  }
`);

export const PORTFOLIO_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "portfolio" && defined(slug.current)]{
    "slug": slug.current
  }
`);

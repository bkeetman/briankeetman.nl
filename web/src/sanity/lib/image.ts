import { createImageUrlBuilder } from '@sanity/image-url';

import { dataset, projectId } from './env';

const builder = createImageUrlBuilder({
  projectId,
  dataset,
});

export function urlFor(source: unknown) {
  if (!source || typeof source !== 'object') return builder.image({ asset: { _ref: '' } });

  // Normalize assets that were expanded with asset->_id instead of _ref
  const image = source as { asset?: { _ref?: string; _id?: string } };
  const asset = image.asset;
  const normalized =
    asset && !asset._ref && asset._id
      ? {
          ...image,
          asset: {
            ...asset,
            _ref: asset._id,
          },
        }
      : image;

  return builder.image(normalized);
}

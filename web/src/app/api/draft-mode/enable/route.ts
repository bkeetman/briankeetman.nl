import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';

if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN for draft mode');
}

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({
    token,
    stega: {
      enabled: true,
      studioUrl: '/studio',
    },
  }),
});

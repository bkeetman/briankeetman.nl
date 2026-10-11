import { defineEnableDraftMode } from 'next-sanity/draft-mode';

import { client } from '@/sanity/lib/client';
import { token } from '@/sanity/lib/token';
import { isSiteHomePreview } from '@/lib/sitehome-preview';

if (!isSiteHomePreview && !token) {
  throw new Error('Missing SANITY_API_READ_TOKEN for draft mode');
}

export const GET = isSiteHomePreview
  ? async () => new Response('Draft mode is unavailable in the test preview', { status: 404 })
  : defineEnableDraftMode({
  client: client.withConfig({
    token,
    stega: {
      enabled: true,
      studioUrl: '/studio',
    },
  }),
}).GET;

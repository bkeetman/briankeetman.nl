import type { Metadata, Viewport } from 'next';

import { StudioWrapper } from './studio-wrapper';

export const dynamic = 'force-static';
export const revalidate = false;
export const metadata: Metadata = {
  title: 'Sanity Studio',
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function StudioPage() {
  return <StudioWrapper />;
}

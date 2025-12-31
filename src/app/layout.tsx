import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { Bebas_Neue, Inter } from 'next/font/google';

import { VisualEditingClient } from '@/components/visual-editing-client';
import { SanityLive } from '@/sanity/lib/live';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas-neue',
});

export const metadata: Metadata = {
  title: 'Brian Keetman',
  description: 'Portfolio website of Brian Keetman',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = draftMode();

  return (
    <html suppressHydrationWarning={true} lang="nl" className="dark">
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans min-h-screen bg-brand-dark-light text-white`}
      >
        {children}
        <SanityLive />
        {isEnabled ? <VisualEditingClient /> : null}
      </body>
    </html>
  );
}

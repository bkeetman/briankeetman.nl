import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';

import { siteDescription, siteName, siteUrl } from '@/lib/seo';
import { isSiteHomePreview } from '@/lib/sitehome-preview';

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
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Full-stack developer & builder`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  ...(isSiteHomePreview ? { robots: { index: false, follow: false } } : {}),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    url: '/',
    siteName,
    title: `${siteName} — Full-stack developer & builder`,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — Full-stack developer & builder`,
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: '#1a1919',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="nl" className="dark">
      <body
        className={`${inter.variable} ${bebasNeue.variable} ${GeistSans.variable} font-sans min-h-screen text-white bk-bg-gradient${isSiteHomePreview ? ' pb-20' : ''}`}
      >
        {children}
        {isSiteHomePreview && (
          <aside aria-label="Testomgeving" className="fixed bottom-0 inset-x-0 z-50 flex flex-wrap items-center justify-between gap-2 border-t border-white/20 bg-[#1a1919]/95 px-4 py-3 text-sm backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <span className="font-semibold">SiteHome · Testpreview</span>
            <a href="https://sitehome-eight.vercel.app" className="inline-flex min-h-11 items-center px-2 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Terug naar SiteHome →</a>
          </aside>
        )}
      </body>
    </html>
  );
}

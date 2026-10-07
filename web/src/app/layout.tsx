import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';

import { siteDescription, siteName, siteUrl } from '@/lib/seo';

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
        className={`${inter.variable} ${bebasNeue.variable} ${GeistSans.variable} font-sans min-h-screen text-white bk-bg-gradient`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Bebas_Neue, Inter } from 'next/font/google';

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
  return (
    <html suppressHydrationWarning={true} lang="nl" className="dark">
      <body
        className={`${inter.variable} ${bebasNeue.variable} font-sans min-h-screen text-white bk-bg-gradient`}
      >
        {children}
      </body>
    </html>
  );
}

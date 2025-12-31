import '../globals.css';

export const dynamic = 'force-static';
export const revalidate = false;
export const runtime = 'nodejs';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="dark">
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  );
}

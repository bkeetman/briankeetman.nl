import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Brian Keetman — Full-stack developer & builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadBebasNeue(text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=Bebas+Neue&text=${encodeURIComponent(text)}`,
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    return url ? await (await fetch(url)).arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const title = 'Brian Keetman';
  const subtitle = 'Full-stack developer & builder';
  const tagline = 'Websites · Webapplicaties · Digitale producten';
  const [logo, bebas] = await Promise.all([
    readFile(join(process.cwd(), 'public/logo-briankeetman-nl.png'), 'base64'),
    loadBebasNeue(`${title}${subtitle}${tagline}`.toUpperCase()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          backgroundColor: '#1a1919',
          backgroundImage:
            'radial-gradient(circle at 15% 20%, rgba(213,20,123,0.35), transparent 45%), radial-gradient(circle at 85% 10%, rgba(116,47,255,0.28), transparent 40%), radial-gradient(circle at 60% 100%, rgba(18,168,168,0.22), transparent 45%)',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <img src={`data:image/png;base64,${logo}`} width={120} height={120} alt="" />
          <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: 'rgba(255,255,255,0.6)' }}>
            BRIANKEETMAN.NL
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: bebas ? 'Bebas Neue' : 'sans-serif',
              fontSize: 168,
              lineHeight: 0.95,
              color: '#d5147b',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 16,
              fontFamily: bebas ? 'Bebas Neue' : 'sans-serif',
              fontSize: 64,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontFamily: bebas ? 'Bebas Neue' : 'sans-serif',
              fontSize: 36,
              letterSpacing: 4,
              color: 'rgba(255,255,255,0.65)',
              textTransform: 'uppercase',
            }}
          >
            {tagline}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: bebas ? [{ name: 'Bebas Neue', data: bebas, style: 'normal', weight: 400 }] : [],
    },
  );
}

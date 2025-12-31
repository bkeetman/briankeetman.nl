import Image from 'next/image';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from '@portabletext/react';

import { urlFor } from '@/sanity/lib/image';

type Props = {
  value?: unknown;
};

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = (value as { href?: string })?.href;
      const openInNewTab = (value as { openInNewTab?: boolean })?.openInNewTab;
      if (!href) return children;
      return (
        <a
          href={href}
          target={openInNewTab ? '_blank' : undefined}
          rel={openInNewTab ? 'noreferrer noopener' : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const image = urlFor(value).width(1600).fit('max');
      const metadata = value.asset?.metadata;
      const width = metadata?.dimensions?.width ?? 1600;
      const height = metadata?.dimensions?.height ?? 900;

      return (
        <Image
          className="rounded-xl border border-white/10 shadow-2xl"
          src={image.url()}
          alt={value.alt || ''}
          width={width}
          height={height}
          placeholder={metadata?.lqip ? 'blur' : 'empty'}
          blurDataURL={metadata?.lqip}
        />
      );
    },
    code: ({ value }) => {
      const code = (value as { code?: string; language?: string })?.code ?? '';
      const language = (value as { language?: string })?.language;
      const lines = code.split('\n');

      return (
        <div className="not-prose overflow-hidden rounded-lg border border-white/10 bg-[#0b1221]">
          <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-[1.5] text-slate-100">
            {language ? (
              <span className="mb-2 inline-block text-[11px] uppercase tracking-[0.14em] text-slate-400">
                {language}
              </span>
            ) : null}
            <code className="block space-y-1">
              {lines.map((line, idx) => {
                const match = line.match(/^(\s*[A-Za-z0-9_-]+)(\s*:\s*)(.+)$/);
                if (!match) {
                  return (
                    <div key={idx} className="font-mono">
                      {line}
                    </div>
                  );
                }
                const [, key, separator, val] = match;
                return (
                  <div key={idx} className="font-mono">
                    <span className="text-brand-pink">{key}</span>
                    <span className="text-slate-500">{separator}</span>
                    <span className="text-amber-100">{val}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      );
    },
  },
};

export function SanityPortableText({ value }: Props) {
  const blocks = (value as PortableTextBlock[] | undefined) ?? [];
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return <PortableText value={blocks} components={components} />;
}

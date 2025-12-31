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
    code: ({ value }) => (
      <pre className="overflow-x-auto rounded-xl border border-brand-pink/30 bg-gray-900 px-6 py-4 text-sm leading-relaxed">
        <code>{(value as { code?: string })?.code}</code>
      </pre>
    ),
  },
};

export function SanityPortableText({ value }: Props) {
  const blocks = (value as PortableTextBlock[] | undefined) ?? [];
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return <PortableText value={blocks} components={components} />;
}

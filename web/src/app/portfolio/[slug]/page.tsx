import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SanityPortableText } from '@/components/portable-text';
import { Button } from '@/components/ui/button';
import { formatPortfolioDate } from '@/lib/date';
import {
  getPortfolioItemBySlug,
  getPortfolioItems,
  getPortfolioSlugs,
} from '@/sanity/lib/content';
import { urlFor } from '@/sanity/lib/image';

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ExternalLink = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const items = await getPortfolioSlugs();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug, {
    stega: false,
    perspective: 'published',
  });

  if (!item) {
    return {
      title: 'Project niet gevonden',
    };
  }

  return {
    title: `${item.title} | Portfolio`,
    description: item.description,
    openGraph: {
      title: item.title,
      description: item.description,
      type: 'article',
      publishedTime: item.date,
      images: item.mainImage?.asset?.url ? [item.mainImage.asset.url] : [],
    },
  };
}

export default async function PortfolioItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = await getPortfolioItemBySlug(slug);

  if (!item) {
    notFound();
  }

  const heroImage = item.mainImage
    ? urlFor(item.mainImage).width(1600).height(1600).fit('max').url()
    : null;
  const heroLqip = item.mainImage?.asset?.metadata?.lqip;

  return (
    <div className="min-h-screen bk-bg-gradient">
      {/* Mobile: Back button */}
      <div className="lg:hidden px-4 pt-6 pb-4">
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white"
        >
          <Link href="/portfolio" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug naar overzicht</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Linker helft: Image (sticky op desktop) */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen relative lg:sticky lg:top-0 flex-shrink-0">
          {heroImage ? (
            <Image
              src={heroImage}
              alt={item.mainImage?.alt || item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              placeholder={heroLqip ? 'blur' : 'empty'}
              blurDataURL={heroLqip}
            />
          ) : (
            <div className="w-full h-full relative">
              <Image
                src="/background.webp"
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-light/70 via-brand-dark-light/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-end justify-start p-8 lg:p-12">
                <div className="text-left z-10 max-w-md">
                  {item.client && (
                    <p className="text-brand-pink text-sm uppercase tracking-widest font-semibold mb-2">
                      {item.client}
                    </p>
                  )}
                  <h2 className="font-display text-2xl lg:text-4xl tracking-tight text-white mb-3 drop-shadow-lg uppercase">
                    {item.title}
                  </h2>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rechter helft: Content */}
        <div className="w-full lg:w-1/2 bg-transparent flex-shrink-0 overflow-y-auto">
          <div className="px-6 sm:px-8 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-2xl mx-auto">
              {/* Desktop: Back button */}
              <div className="hidden lg:block mb-12">
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-400 hover:text-white -ml-2"
                >
                  <Link href="/portfolio" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Terug naar overzicht</span>
                  </Link>
                </Button>
              </div>

              <article>
                {/* Header */}
                <header className="mb-12 lg:mb-16">
                  <div className="flex items-center gap-4 mb-4 text-sm font-medium uppercase tracking-[0.2em] text-gray-400">
                    <time dateTime={item.date} className="text-brand-pink">
                         {formatPortfolioDate(item.date || '')}
                    </time>
                    {item.client && (
                        <>
                            <span>•</span>
                            <span>{item.client}</span>
                        </>
                    )}
                  </div>

                  <h1 className="bk-heading-hero text-white mb-6 leading-[1.05]">
                    {item.title}
                  </h1>

                  {item.description && (
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8">
                      {item.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 mb-8">
                      {item.technologies && item.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs uppercase tracking-wider text-gray-300">
                              {tech}
                          </span>
                      ))}
                  </div>

                  {item.website && (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-brand-pink/60 bg-brand-pink/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand-pink transition hover:bg-brand-pink/25 hover:border-brand-pink"
                    >
                      <span>Bezoek website</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </header>

                <div className="h-px bg-white/10 w-full mb-12 lg:mb-16" />

                {/* Content */}
                <div
                  className="prose prose-invert prose-lg sm:prose-xl max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:text-white prose-h1:font-display prose-h1:uppercase
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:text-brand-pink prose-h2:font-display prose-h2:uppercase
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-white prose-h3:font-sans
                    prose-p:text-gray-300 prose-p:text-base prose-p:leading-relaxed prose-p:my-5
                    prose-li:text-gray-300 prose-li:my-1 prose-li:text-base
                    prose-strong:text-white prose-strong:font-semibold
                    prose-ul:pl-5 prose-ul:my-6
                    prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8 prose-img:border prose-img:border-white/10
                    prose-pre:bg-transparent prose-pre:border-0 prose-pre:p-0 prose-pre:my-8 prose-pre:overflow-visible
                    prose-pre-code:bg-transparent prose-pre-code:p-0 prose-pre-code:border-0 prose-pre-code:text-base prose-pre-code:leading-[1.5]"
                >
                  <SanityPortableText value={item.body} />
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

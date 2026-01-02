import { stegaClean } from '@sanity/client/stega';
import Image from 'next/image';
import Link from 'next/link';

import { formatPortfolioDate } from '@/lib/date';
import { getPortfolioItems } from '@/sanity/lib/content';
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

export const metadata = {
  title: 'Portfolio | Brian Keetman',
  description:
    'Een selectie van recente projecten, producten en samenwerkingen.',
};

export default async function PortfolioIndex() {
  const items = await getPortfolioItems();

  return (
    <div className="min-h-screen bk-bg-gradient">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Hero */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex-shrink-0">
          <Image
            src="/background.webp"
            alt="Brian Keetman"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/85 via-brand-dark/65 to-brand-dark/40" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-white text-sm font-medium uppercase tracking-wide transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar home
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-3">
                Portfolio
              </p>
              <h1 className="bk-heading-hero leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                Gerealiseerde Projecten
              </h1>
              <p className="mt-5 max-w-lg text-base sm:text-lg text-gray-100 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                Een overzicht van digitale producten, platforms en applicaties die ik heb ontworpen en ontwikkeld.
              </p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="w-full lg:w-1/2 bg-transparent flex-shrink-0 overflow-y-auto">
          <div className="px-6 sm:px-8 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-2xl mx-auto space-y-8">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
                  <p className="font-display text-2xl text-brand-pink uppercase tracking-tight mb-4">
                    Binnenkort
                  </p>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Nog geen projecten gepubliceerd.
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const slug = stegaClean(item.slug);
                  const thumb = item.mainImage
                    ? urlFor(item.mainImage).width(360).height(200).fit('crop').url()
                    : null;

                  return (
                    <article
                      key={slug}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/70 p-6 sm:p-7 ring-1 ring-white/5 hover:border-brand-pink/60 hover:ring-brand-pink/30 transition"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                          <span className="text-brand-pink">
                            {formatPortfolioDate(item.date || '')}
                          </span>
                          {item.client && (
                            <>
                              <span className="text-gray-600">•</span>
                              <span>{item.client}</span>
                            </>
                          )}
                        </div>
                        <div>
                        <h2 className="bk-heading-sub text-3xl sm:text-4xl mb-3 leading-[1.05] group-hover:text-brand-pink transition-colors">
                          <Link href={`/portfolio/${slug}`}>{item.title}</Link>
                        </h2>
                          {item.description && (
                            <p className="text-gray-200 text-base leading-relaxed">
                              {item.description}
                            </p>
                          )}
                          {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs uppercase tracking-wider bg-white/10 text-gray-300 px-2 py-1 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 text-sm font-semibold uppercase tracking-wide">
                          <Link
                            href={`/portfolio/${slug}`}
                            className="inline-flex items-center gap-2 text-brand-pink hover:text-white transition-colors"
                          >
                            Bekijk project
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
                              className="h-4 w-4"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </Link>
                          {thumb && (
                            <div className="relative h-16 w-28 overflow-hidden rounded-xl border border-white/10">
                              <Image
                                src={thumb}
                                alt={item.title}
                                fill
                                className="object-cover"
                                sizes="112px"
                                placeholder={
                                  item.mainImage?.asset?.metadata?.lqip ? 'blur' : 'empty'
                                }
                                blurDataURL={item.mainImage?.asset?.metadata?.lqip}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

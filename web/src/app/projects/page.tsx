import { stegaClean } from '@sanity/client/stega';
import Image from 'next/image';
import Link from 'next/link';

import { FadeIn, MotionCard } from '@/components/motion/patterns';
import { formatProjectDate } from '@/lib/date';
import { getProjectTheme } from '@/lib/projectThemes';
import { getProjects } from '@/sanity/lib/content';
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

const statusLabel = (status?: string) => {
  switch (status) {
    case 'concept':
      return 'Concept';
    case 'in-bouw':
      return 'In bouw';
    case 'beta':
      return 'Beta';
    case 'live':
      return 'Live';
    default:
      return status;
  }
};

export const metadata = {
  title: 'Projecten | Brian Keetman',
  description:
    'Lopende projecten, experimenten en ideeën in ontwikkeling.',
};

export default async function ProjectsIndex() {
  const items = await getProjects();

  return (
    <div className="min-h-screen bk-bg-gradient">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Hero */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen flex-shrink-0">
          <Image
            src="/background-ufo.webp"
            alt="Brian met robot"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 via-brand-dark/60 to-brand-dark/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 gap-6">
            <FadeIn className="w-fit">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-200 hover:text-white text-sm font-medium uppercase tracking-wide transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Terug naar home
              </Link>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/70 mb-3">
                  Projecten
                </p>
                <h1 className="bk-heading-hero leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                  Lopende Bouwstenen
                </h1>
                <p className="mt-5 max-w-lg text-base sm:text-lg text-gray-100 leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
                  Experimenten, tools en ideeën waar ik momenteel aan werk. Hier vind je
                  context, updates en later ook handleidingen of downloads.
                </p>
              </div>
            </FadeIn>
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
                items.map((item, index) => {
                  const slug = stegaClean(item.slug);
                  const thumb = item.mainImage
                    ? urlFor(item.mainImage).width(360).height(200).fit('crop').url()
                    : null;
                  const status = statusLabel(item.status);
                  const dateLabel = item.startedAt
                    ? formatProjectDate(item.startedAt)
                    : 'Lopend';
                  const theme = getProjectTheme(slug);

                  return (
                    <MotionCard
                      key={slug}
                      delay={index * 0.05}
                      className="group relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-200"
                      style={{
                        borderColor: `color-mix(in srgb, ${theme.accent} 25%, transparent)`,
                        backgroundColor: theme.accentMuted,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${theme.accent} 60%, transparent)`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px color-mix(in srgb, ${theme.accent} 20%, transparent)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${theme.accent} 25%, transparent)`;
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <div className="p-6 sm:p-7 flex flex-col gap-4">
                        {/* Logo + meta row */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                            <span style={{ color: theme.accent }}>{dateLabel}</span>
                            {status && (
                              <>
                                <span className="text-gray-600">•</span>
                                <span>{status}</span>
                              </>
                            )}
                          </div>
                          {theme.logo && (
                            <Image
                              src={theme.logo}
                              alt={theme.logoAlt ?? item.title}
                              width={32}
                              height={32}
                              className="rounded-md opacity-90"
                            />
                          )}
                        </div>

                        {/* Title + description */}
                        <div>
                          <h2
                            className="bk-heading-sub text-3xl sm:text-4xl mb-3 leading-[1.05] transition-colors group-hover:text-white"
                            style={{ color: 'white' }}
                          >
                            <Link href={`/projects/${slug}`}>{item.title}</Link>
                          </h2>
                          {item.description && (
                            <p className="text-gray-200 text-base leading-relaxed">{item.description}</p>
                          )}
                          {item.technologies && item.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              {item.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-xs uppercase tracking-wider px-2 py-1 rounded"
                                  style={{
                                    backgroundColor: `color-mix(in srgb, ${theme.accent} 12%, transparent)`,
                                    color: theme.accent,
                                    border: `1px solid color-mix(in srgb, ${theme.accent} 30%, transparent)`,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Footer row: links + thumbnail */}
                        <div className="flex items-center justify-between pt-3 text-sm font-semibold uppercase tracking-wide">
                          <div className="flex items-center gap-4">
                            <Link
                              href={`/projects/${slug}`}
                              className="inline-flex items-center gap-2 transition-colors hover:text-white"
                              style={{ color: theme.accent }}
                            >
                              Bekijk project
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                              </svg>
                            </Link>
                            {item.website && (
                              <a
                                href={item.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                                </svg>
                                Bezoek
                              </a>
                            )}
                          </div>
                          {thumb && (
                            <div className="relative h-16 w-28 overflow-hidden rounded-xl border border-white/10">
                              <Image src={thumb} alt={item.title} fill className="object-cover" sizes="112px"
                                placeholder={item.mainImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                                blurDataURL={item.mainImage?.asset?.metadata?.lqip}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </MotionCard>
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

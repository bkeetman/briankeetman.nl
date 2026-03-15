import { stegaClean } from '@sanity/client/stega';
import Image from 'next/image';
import Link from 'next/link';

import { FadeIn } from '@/components/motion/patterns';
import { formatProjectDate } from '@/lib/date';
import { getProjectTheme } from '@/lib/projectThemes';
import { getProjects } from '@/sanity/lib/content';
import { urlFor } from '@/sanity/lib/image';
import { ProjectCard } from './project-card';

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
                    <ProjectCard
                      key={slug}
                      slug={slug}
                      title={item.title}
                      description={item.description}
                      dateLabel={dateLabel}
                      status={status}
                      technologies={item.technologies}
                      website={item.website}
                      thumb={thumb}
                      mainImage={item.mainImage}
                      theme={theme}
                      delay={index * 0.05}
                    />
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

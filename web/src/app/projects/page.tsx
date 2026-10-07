import { stegaClean } from '@sanity/client/stega';

import { BackLink } from '@/components/back-link';
import { IndexHero } from '@/components/index-hero';
import { ShowcaseCard } from '@/components/showcase-card';
import { getProjectTheme } from '@/lib/projectThemes';
import { getProjects } from '@/sanity/lib/content';
import { urlFor } from '@/sanity/lib/image';
import { pageMetadata } from '@/lib/seo';

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

export const metadata = pageMetadata({
  title: 'Projecten',
  description:
    'Projecten, tools en digitale producten in ontwikkeling.',
  path: '/projects',
});

export default async function ProjectsIndex() {
  const items = await getProjects();

  return (
    <div className="min-h-screen bk-bg-gradient">
      <BackLink href="/" label="Home" />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <IndexHero
          image="/background-ufo-sunset.webp"
          imageAlt="Brian kijkt naar een ufo bij zonsondergang"
          imageClassName="object-[40%_50%]"
          eyebrow="Projecten"
          title="Projecten In Ontwikkeling"
          intro="Tools, experimenten en digitale producten waar ik actief aan werk — van eerste idee tot live product."
        />

        {/* List */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <div className="px-6 sm:px-8 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-2xl mx-auto space-y-6">
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
                  const theme = getProjectTheme(slug);
                  const image = theme.preview
                    ? theme.preview
                    : item.mainImage
                    ? urlFor(item.mainImage).width(1200).height(750).fit('crop').url()
                    : null;

                  return (
                    <ShowcaseCard
                      key={slug}
                      href={`/projects/${slug}`}
                      title={item.title}
                      eyebrow="Project"
                      status={statusLabel(item.status)}
                      description={item.description}
                      technologies={item.technologies}
                      website={item.website}
                      image={image}
                      blurDataURL={
                        theme.preview ? undefined : item.mainImage?.asset?.metadata?.lqip
                      }
                      logo={theme.logo}
                      logoAlt={theme.logoAlt}
                      accent={theme.accent}
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

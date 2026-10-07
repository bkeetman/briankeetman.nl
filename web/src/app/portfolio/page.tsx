import { stegaClean } from '@sanity/client/stega';

import { BackLink } from '@/components/back-link';
import { IndexHero } from '@/components/index-hero';
import { ShowcaseCard } from '@/components/showcase-card';
import { formatPortfolioDate } from '@/lib/date';
import { getPortfolioItems } from '@/sanity/lib/content';
import { urlFor } from '@/sanity/lib/image';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Portfolio',
  description:
    'Een selectie van recente projecten, producten en samenwerkingen.',
  path: '/portfolio',
});

export default async function PortfolioIndex() {
  const items = await getPortfolioItems();

  return (
    <div className="min-h-screen bk-bg-gradient">
      <BackLink href="/" label="Home" />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <IndexHero
          image="/portfolio/farmtrade/diner-cow.png"
          imageAlt="Cow Siner illustration"
          eyebrow="Portfolio"
          title="Gerealiseerde Projecten"
          intro="Een overzicht van digitale producten, platforms en applicaties die ik heb ontworpen en ontwikkeld."
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
                  const image = item.mainImage
                    ? urlFor(item.mainImage).width(1200).height(750).fit('crop').url()
                    : null;

                  return (
                    <ShowcaseCard
                      key={slug}
                      href={`/portfolio/${slug}`}
                      title={item.title}
                      eyebrow={formatPortfolioDate(item.date || '')}
                      meta={item.client}
                      description={item.description}
                      technologies={item.technologies}
                      website={item.website}
                      image={image}
                      blurDataURL={item.mainImage?.asset?.metadata?.lqip}
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

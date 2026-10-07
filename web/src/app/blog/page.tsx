import { stegaClean } from '@sanity/client/stega';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { BackLink } from '@/components/back-link';
import { IndexHero } from '@/components/index-hero';
import { MotionCard } from '@/components/motion/patterns';
import { VisualEditingClient } from '@/components/visual-editing-client';
import { formatPostDate } from '@/lib/date';
import { getPosts } from '@/sanity/lib/content';
import { urlFor } from '@/sanity/lib/image';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'Recente artikelen over full-stack development, infra en digitale producten.',
  path: '/blog',
});

export default async function BlogIndex() {
  const posts = await getPosts();
  const { isEnabled } = await draftMode();

  return (
    <div className="min-h-screen bk-bg-gradient">
      <BackLink href="/" label="Home" />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <IndexHero
          image="/background.webp"
          imageAlt="Brian Keetman"
          eyebrow="Blog"
          title="Lesjes uit de werkplaats"
          intro="Tech, product en ondernemerschap. Geen fluff, wél praktijk. Dit is waar ik opschrijf hoe ik dingen bouw, automatiseer en optimaliseer."
        />

        {/* List */}
        <div className="w-full lg:w-1/2 flex-shrink-0">
          <div className="px-6 sm:px-8 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-2xl mx-auto space-y-8">
              {posts.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center">
                  <p className="font-display text-2xl text-brand-pink uppercase tracking-tight mb-4">
                    Binnenkort
                  </p>
                    <p className="text-gray-300 text-base leading-relaxed">
                      Nog geen artikelen gepubliceerd. Zodra je je eerste{' '}
                      <code className="rounded bg-gray-900 px-2 py-1 text-sm text-white">
                        .mdx
                      </code>{' '}
                    bestand in <span className="font-semibold">/posts</span>{' '}
                    plaatst, verschijnt het hier.
                  </p>
                </div>
              ) : (
                posts.map((post, index) => {
                  const slug = stegaClean(post.slug);
                  const thumb = post.mainImage
                    ? urlFor(post.mainImage).width(360).height(200).fit('crop').url()
                    : null;

                  return (
                    <MotionCard
                      key={slug}
                      delay={index * 0.05}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-brand-dark/70 p-6 sm:p-7 ring-1 ring-white/5 hover:border-brand-pink/60 hover:ring-brand-pink/30 transition-[border-color,box-shadow] duration-200"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
                          <span className="text-brand-pink">
                            {formatPostDate(post.publishedAt || '')}
                          </span>
                        </div>
                        <div>
                        <h2 className="bk-heading-sub text-3xl sm:text-4xl mb-3 leading-[1.05] group-hover:text-brand-pink transition-colors">
                          <Link href={`/blog/${slug}`}>{post.title}</Link>
                        </h2>
                          {post.description && (
                            <p className="text-gray-200 text-base leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 text-sm font-semibold uppercase tracking-wide">
                          <Link
                            href={`/blog/${slug}`}
                            className="inline-flex items-center gap-2 text-brand-pink hover:text-white transition-colors"
                          >
                            Lees artikel
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
                                alt={post.title}
                                fill
                                className="object-cover"
                                sizes="112px"
                                placeholder={
                                  post.mainImage?.asset?.metadata?.lqip ? 'blur' : 'empty'
                                }
                                blurDataURL={post.mainImage?.asset?.metadata?.lqip}
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
        {isEnabled ? <VisualEditingClient /> : null}
    </div>
  );
}

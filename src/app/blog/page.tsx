import { stegaClean } from '@sanity/client/stega';
import { draftMode } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

import { VisualEditingClient } from '@/components/visual-editing-client';
import { formatPostDate } from '@/lib/date';
import { getPosts } from '@/sanity/lib/content';
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
  title: 'Blog | Brian Keetman',
  description:
    'Recente artikelen over full-stack development, infra en digitale producten.',
};

export default async function BlogIndex() {
  const posts = await getPosts();
  const { isEnabled } = await draftMode();

  return (
    <div className="min-h-screen bg-brand-dark-light">
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
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-light/80 via-brand-dark-light/60 to-brand-dark-light/30" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12 gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-200 hover:text-white text-sm font-medium uppercase tracking-wide transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Terug naar home
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-white/70 mb-4">
                Blog
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tightest text-brand-pink uppercase leading-[1.05]">
                Lesjes uit de werkplaats
              </h1>
              <p className="mt-6 max-w-lg text-base sm:text-lg text-gray-200 leading-relaxed">
                Tech, product en ondernemerschap. Geen fluff, wél praktijk. Dit
                is waar ik opschrijf hoe ik dingen bouw, automatiseer en
                optimaliseer.
              </p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="w-full lg:w-1/2 bg-brand-dark-light flex-shrink-0 overflow-y-auto">
          <div className="px-6 sm:px-8 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-2xl mx-auto space-y-10">
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
                posts.map((post) => {
                  const slug = stegaClean(post.slug);
                  const thumb = post.mainImage
                    ? urlFor(post.mainImage).width(360).height(200).fit('crop').url()
                    : null;

                  return (
                    <article
                      key={slug}
                      className="group rounded-3xl border border-white/5 bg-white/5 p-6 sm:p-8 hover:border-brand-pink/60 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-[0.35em] text-gray-400">
                          <span className="text-brand-pink tracking-[0.4em]">
                            {formatPostDate(post.publishedAt || '')}
                          </span>
                        </div>
                        <div>
                          <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-white uppercase mb-4 leading-[1.05] group-hover:text-brand-pink transition-colors">
                            <Link href={`/blog/${slug}`}>{post.title}</Link>
                          </h2>
                          {post.description && (
                            <p className="text-gray-300 text-base leading-relaxed">
                              {post.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-4 text-sm font-semibold uppercase tracking-wide">
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
                    </article>
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

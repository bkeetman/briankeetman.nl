import { Button } from '@/components/ui/button';
import { formatPostDate, getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post niet gevonden',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-brand-dark-light">
      {/* Mobile: Back button */}
      <div className="lg:hidden px-4 pt-6 pb-4">
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-white"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Terug</span>
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Linker helft: Image (sticky op desktop) */}
        <div className="w-full lg:w-1/2 h-[40vh] lg:h-screen relative lg:sticky lg:top-0 flex-shrink-0">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="w-full h-full relative">
              {/* Fallback: gebruik background.webp als standaard */}
              <Image
                src="/background.webp"
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Overlay met gradient voor betere tekst leesbaarheid */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-dark-light/70 via-brand-dark-light/50 to-transparent"></div>
              {/* Titel overlay - bottom aligned */}
              <div className="absolute inset-0 flex items-end justify-start p-8 lg:p-12">
                <div className="text-left z-10 max-w-md">
                  <h2 className="font-display text-2xl lg:text-4xl tracking-tight text-white mb-3 drop-shadow-lg uppercase">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-gray-200 text-sm lg:text-base drop-shadow leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rechter helft: Content */}
        <div className="w-full lg:w-1/2 bg-brand-dark-light flex-shrink-0 overflow-y-auto">
          <div className="px-6 sm:px-8 lg:px-20 xl:px-24 py-12 sm:py-16 lg:py-20 xl:py-24">
            <div className="max-w-2xl mx-auto">
              {/* Desktop: Back button */}
              <div className="hidden lg:block mb-12">
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-400 hover:text-white -ml-2"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Terug naar home</span>
                  </Link>
                </Button>
              </div>

              <article>
                {/* Header */}
                <header className="mb-16 lg:mb-20">
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tightest text-brand-pink mb-8 leading-[1.1] uppercase">
                    {post.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-8">
                    <time
                      dateTime={post.date}
                      className="text-brand-pink text-sm sm:text-base font-medium"
                    >
                      {formatPostDate(post.date)}
                    </time>
                  </div>
                  {post.description && (
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                      {post.description}
                    </p>
                  )}
                </header>

                {/* Content */}
                <div
                  className="prose prose-invert prose-lg sm:prose-xl lg:prose-2xl max-w-none
                    prose-headings:font-bold prose-headings:tracking-tight
                    prose-h1:text-4xl prose-h1:mt-16 prose-h1:mb-8 prose-h1:leading-tight prose-h1:text-white prose-h1:font-display prose-h1:uppercase prose-h1:tracking-tightest prose-h1:text-brand-pink
                    prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:leading-tight prose-h2:text-brand-pink prose-h2:font-display prose-h2:uppercase prose-h2:tracking-tight
                    prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-5 prose-h3:leading-tight prose-h3:text-brand-pink prose-h3:font-sans prose-h3:font-semibold
                    prose-h4:text-xl prose-h4:mt-10 prose-h4:mb-4 prose-h4:text-gray-100 prose-h4:font-sans prose-h4:font-semibold
                    prose-p:text-gray-200 prose-p:text-base prose-p:leading-relaxed prose-p:my-6
                    prose-a:text-brand-pink prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:transition-all
                    prose-strong:text-white prose-strong:font-semibold
                    prose-code:text-white prose-code:bg-gray-900 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-base prose-code:font-mono prose-code:border prose-code:border-white/10
                    prose-pre:bg-gray-900 prose-pre:border prose-pre:border-brand-pink/30 prose-pre:rounded-xl prose-pre:p-6 lg:prose-pre:p-8 prose-pre:my-10 prose-pre:overflow-x-auto
                    prose-pre-code:bg-transparent prose-pre-code:p-0 prose-pre-code:border-0 prose-pre-code:text-base
                    prose-blockquote:text-gray-400 prose-blockquote:border-brand-pink prose-blockquote:border-l-4 prose-blockquote:pl-8 prose-blockquote:pr-4 prose-blockquote:my-10 prose-blockquote:italic prose-blockquote:text-base prose-blockquote:leading-relaxed
                    prose-ul:text-gray-200 prose-ul:my-6 prose-ul:space-y-2 prose-ul:pl-6
                    prose-ol:text-gray-200 prose-ol:my-6 prose-ol:space-y-2 prose-ol:pl-6
                    prose-li:text-gray-200 prose-li:my-2 prose-li:leading-relaxed prose-li:text-base prose-li:pl-2
                    prose-hr:border-white/10 prose-hr:my-16 prose-hr:border-t-2
                    prose-img:rounded-xl prose-img:my-12 prose-img:shadow-2xl
                    prose-table:text-gray-200 prose-table:my-10
                    prose-th:text-white prose-th:border-white/10 prose-th:font-semibold
                    prose-td:border-white/10 prose-td:py-3"
                  dangerouslySetInnerHTML={{ __html: post.htmlContent }}
                />
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

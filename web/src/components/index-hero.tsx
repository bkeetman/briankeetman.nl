import Image from 'next/image';

import { FadeIn } from '@/components/motion/patterns';

type IndexHeroProps = {
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: string;
  intro: string;
};

/** Left-hand hero for the overview pages (blog, portfolio, projecten). */
export function IndexHero({ image, imageAlt, eyebrow, title, intro }: IndexHeroProps) {
  return (
    <div className="relative w-full flex-shrink-0 overflow-hidden lg:sticky lg:top-0 lg:h-screen lg:w-1/2">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/85 via-brand-dark/65 to-brand-dark/35" />
      <div className="relative z-10 flex min-h-[60svh] flex-col justify-end p-8 pt-24 lg:h-full lg:p-12">
        <FadeIn>
          <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
            {eyebrow}
          </p>
          <h1 className="bk-heading-hero leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
            {title}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-lg">
            {intro}
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

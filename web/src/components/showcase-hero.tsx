import Image from 'next/image';

type ShowcaseHeroProps = {
  image: string;
  alt: string;
  blurDataURL?: string;
  accent?: string;
  /** Intrinsic image size; the frame follows its aspect ratio (clamped). */
  width?: number;
  height?: number;
};

/**
 * Full-bleed hero for detail pages: a blurred, tinted copy of the screenshot
 * fills the panel and the screenshot itself sits on top in a browser frame.
 */
export function ShowcaseHero({
  image,
  alt,
  blurDataURL,
  accent = '#d5147b',
  width,
  height,
}: ShowcaseHeroProps) {
  const ratio = width && height ? Math.min(Math.max(width / height, 4 / 3), 2) : 16 / 10;

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-dark">
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        className="scale-125 object-cover opacity-45 blur-3xl saturate-150"
        sizes="50vw"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, color-mix(in srgb, ${accent} 38%, transparent), transparent 55%), radial-gradient(circle at 80% 90%, rgba(213,20,123,0.22), transparent 50%)`,
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/30" />

      <div className="absolute inset-0 flex items-center justify-center p-6 pt-16 sm:p-10 sm:pt-20 lg:p-14">
        <div
          className="w-full max-w-3xl overflow-hidden rounded-xl border border-white/15 bg-brand-dark shadow-2xl shadow-black/60"
          style={{
            boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px color-mix(in srgb, ${accent} 25%, transparent), 0 0 60px -10px color-mix(in srgb, ${accent} 45%, transparent)`,
          }}
        >
          <div className="flex h-7 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <div className="relative" style={{ aspectRatio: ratio }}>
            <Image
              src={image}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from 'next/image';

type ProjectAppHeroProps = {
  screenshots: { src: string; alt: string }[];
  accent: string;
};

export function ProjectAppHero({ screenshots, accent }: ProjectAppHeroProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-brand-dark">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 45%, color-mix(in srgb, ${accent} 16%, transparent), transparent 70%), linear-gradient(145deg, #1c3053, #101827)`,
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center gap-3 px-5 pb-6 pt-16 sm:gap-5 sm:px-8 lg:gap-6 lg:px-10 lg:pb-12 lg:pt-24">
        {screenshots.map((screenshot) => (
          <Image
            key={screenshot.src}
            src={screenshot.src}
            alt={screenshot.alt}
            width={600}
            height={1300}
            className="h-auto max-h-full w-auto max-w-[47%] rounded-xl border border-white/10 object-contain shadow-xl shadow-black/30 sm:rounded-2xl"
            sizes="(max-width: 1023px) 45vw, 24vw"
            priority
          />
        ))}
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';

import { MotionCard } from '@/components/motion/patterns';

interface ShowcaseCardProps {
  href: string;
  title: string;
  /** Pink label above the title, e.g. "Project" or a date. */
  eyebrow: string;
  /** Secondary label next to the eyebrow, e.g. the client. */
  meta?: string;
  /** Status label rendered with a coloured dot (Live, Beta, ...). */
  status?: string;
  description?: string;
  technologies?: string[];
  website?: string;
  image?: string | null;
  blurDataURL?: string;
  logo?: string;
  logoAlt?: string;
  accent?: string;
  delay?: number;
}

const ArrowIcon = ({ className }: { className?: string }) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const ExternalIcon = ({ className }: { className?: string }) => (
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
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const statusTone: Record<string, string> = {
  Live: 'bg-emerald-400',
  Beta: 'bg-amber-400',
  'In bouw': 'bg-sky-400',
  Concept: 'bg-gray-400',
};

export function ShowcaseCard({
  href,
  title,
  eyebrow,
  meta,
  status,
  description,
  technologies,
  website,
  image,
  blurDataURL,
  logo,
  logoAlt,
  accent = '#d5147b',
  delay = 0,
}: ShowcaseCardProps) {
  return (
    <MotionCard
      delay={delay}
      className="group relative rounded-2xl border border-white/10 bg-brand-dark/70 p-4 ring-1 ring-white/5 transition-colors hover:border-brand-pink/50 sm:p-5"
    >
      <Link
        href={href}
        className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-white/5"
        aria-label={`Bekijk ${title}`}
      >
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1023px) 100vw, 640px"
            placeholder={blurDataURL ? 'blur' : 'empty'}
            blurDataURL={blurDataURL}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 24%, #1a1919) 0%, #1a1919 78%)`,
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px opacity-70"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          }}
        />
      </Link>

      <div className="px-1 pb-1 pt-5">
        <div className="flex items-center gap-4">
          {logo && (
            <Image
              src={logo}
              alt={logoAlt ?? `${title} logo`}
              width={44}
              height={44}
              className="h-11 w-11 flex-shrink-0 rounded-xl ring-1 ring-white/10"
            />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
              <span className="text-brand-pink">{eyebrow}</span>
              {meta && <span>{meta}</span>}
              {status && (
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusTone[status] ?? 'bg-gray-400'}`}
                  />
                  {status}
                </span>
              )}
            </div>
            <h2 className="mt-1.5 font-display text-3xl uppercase leading-none tracking-hero text-white transition-colors group-hover:text-brand-pink sm:text-4xl">
              <Link href={href}>{title}</Link>
            </h2>
          </div>
        </div>

        {description && (
          <p className="mt-4 text-sm leading-relaxed text-gray-300 sm:text-[15px]">
            {description}
          </p>
        )}

        <div className="mt-5 flex flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          {technologies && technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-wide text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <span />
          )}

          <div className="flex flex-shrink-0 items-center gap-5 text-xs font-semibold uppercase tracking-[0.18em]">
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-400 transition-colors hover:text-white"
              >
                Bezoek
                <ExternalIcon className="h-3.5 w-3.5" />
              </a>
            )}
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 text-brand-pink transition-colors hover:text-white"
            >
              Bekijk
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </MotionCard>
  );
}

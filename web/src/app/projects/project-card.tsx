'use client';

import Image from 'next/image';
import Link from 'next/link';

import { MotionCard } from '@/components/motion/patterns';
import type { ProjectTheme } from '@/lib/projectThemes';
import type { SanityImageWithMetadata } from '@/sanity/types';

interface ProjectCardProps {
  slug: string;
  title: string;
  description?: string;
  status?: string;
  technologies?: string[];
  website?: string;
  thumb?: string | null;
  mainImage?: SanityImageWithMetadata | null;
  theme: ProjectTheme;
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

export function ProjectCard({
  slug,
  title,
  description,
  status,
  technologies,
  website,
  thumb,
  mainImage,
  theme,
  delay = 0,
}: ProjectCardProps) {
  const logoSize =
    slug === 'dingetje'
      ? { width: 74, height: 28 }
      : { width: 34, height: 34 };

  return (
    <MotionCard
      delay={delay}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111419]/92 ring-1 ring-white/5 transition-[border-color,box-shadow] duration-200 hover:border-brand-pink/40"
      style={{
        boxShadow: `0 0 0 1px color-mix(in srgb, ${theme.accent} 10%, transparent)`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`,
        }}
      />

      <div className="flex flex-col">
        <div className="flex min-w-0 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gray-500">
            <span className="text-brand-pink">Project</span>
            {status && <span>{status}</span>}
          </div>

          <h2 className="mt-5 font-display text-3xl uppercase leading-none tracking-hero text-white transition-colors group-hover:text-brand-pink sm:text-4xl">
            <Link href={`/projects/${slug}`}>{title}</Link>
          </h2>

          {description && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-gray-300 sm:text-base">
              {description}
            </p>
          )}

          {technologies && technologies.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-pink/40 bg-brand-pink/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-brand-pink/70 hover:bg-brand-pink/15"
            >
              Bekijk project
              <ArrowIcon className="h-4 w-4" />
            </Link>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-300 transition hover:border-white/25 hover:text-white"
              >
                Bezoek
                <ExternalIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        <Link
          href={`/projects/${slug}`}
          className="relative min-h-[12rem] overflow-hidden border-t border-white/10 bg-white/[0.03] sm:min-h-[14rem]"
        >
          {thumb ? (
            <Image
              src={thumb}
              alt={title}
              fill
              className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.035] group-hover:opacity-100"
              sizes="(max-width: 1023px) 100vw, 520px"
              placeholder={mainImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={mainImage?.asset?.metadata?.lqip}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${theme.accent} 20%, #111419) 0%, #111419 78%)`,
              }}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#111419] via-[#111419]/15 to-transparent" />

          {theme.logo && (
            <div className="absolute left-4 top-4 rounded-xl border border-white/10 bg-white/90 p-2 shadow-sm">
              <Image
                src={theme.logo}
                alt={theme.logoAlt ?? `${title} logo`}
                width={logoSize.width}
                height={logoSize.height}
                className="rounded-lg"
              />
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/70">
              Preview
            </span>
            <ArrowIcon className="h-4 w-4 text-white/80" />
          </div>
        </Link>
      </div>
    </MotionCard>
  );
}

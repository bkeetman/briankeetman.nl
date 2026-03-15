'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { MotionCard } from '@/components/motion/patterns';
import type { ProjectTheme } from '@/lib/projectThemes';
import type { SanityImageWithMetadata } from '@/sanity/types';

interface ProjectCardProps {
  slug: string;
  title: string;
  description?: string;
  dateLabel: string;
  status?: string;
  technologies?: string[];
  website?: string;
  thumb?: string | null;
  mainImage?: SanityImageWithMetadata | null;
  theme: ProjectTheme;
  delay?: number;
}

export function ProjectCard({
  slug,
  title,
  description,
  dateLabel,
  status,
  technologies,
  website,
  thumb,
  mainImage,
  theme,
  delay = 0,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <MotionCard
      delay={delay}
      className="group relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-200"
      style={{
        borderColor: hovered
          ? `color-mix(in srgb, ${theme.accent} 60%, transparent)`
          : `color-mix(in srgb, ${theme.accent} 25%, transparent)`,
        backgroundColor: theme.accentMuted,
        boxShadow: hovered
          ? `0 0 24px color-mix(in srgb, ${theme.accent} 20%, transparent)`
          : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-6 sm:p-7 flex flex-col gap-4">
        {/* Logo + meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
            <span style={{ color: theme.accent }}>{dateLabel}</span>
            {status && (
              <>
                <span className="text-gray-600">•</span>
                <span>{status}</span>
              </>
            )}
          </div>
          {theme.logo && (
            <Image
              src={theme.logo}
              alt={theme.logoAlt ?? title}
              width={32}
              height={32}
              className="rounded-md opacity-90"
            />
          )}
        </div>

        {/* Title + description */}
        <div>
          <h2 className="bk-heading-sub text-3xl sm:text-4xl mb-3 leading-[1.05]" style={{ color: 'white' }}>
            <Link href={`/projects/${slug}`}>{title}</Link>
          </h2>
          {description && (
            <p className="text-gray-200 text-base leading-relaxed">{description}</p>
          )}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs uppercase tracking-wider px-2 py-1 rounded"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${theme.accent} 12%, transparent)`,
                    color: theme.accent,
                    border: `1px solid color-mix(in srgb, ${theme.accent} 30%, transparent)`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer row: links + thumbnail */}
        <div className="flex items-center justify-between pt-3 text-sm font-semibold uppercase tracking-wide">
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-white"
              style={{ color: theme.accent }}
            >
              Bekijk project
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
                Bezoek
              </a>
            )}
          </div>
          {thumb && (
            <div className="relative h-16 w-28 overflow-hidden rounded-xl border border-white/10">
              <Image
                src={thumb}
                alt={title}
                fill
                className="object-cover"
                sizes="112px"
                placeholder={mainImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                blurDataURL={mainImage?.asset?.metadata?.lqip}
              />
            </div>
          )}
        </div>
      </div>
    </MotionCard>
  );
}

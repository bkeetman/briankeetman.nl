'use client';

import Link from 'next/link';
import { useState } from 'react';

import { CardShowcaseRail } from '@/components/card-showcase-rail';
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
        backgroundColor: theme.cardBg,
        borderColor: hovered
          ? `color-mix(in srgb, ${theme.accent} 50%, transparent)`
          : `color-mix(in srgb, ${theme.accent} 20%, transparent)`,
        boxShadow: hovered
          ? `0 0 32px color-mix(in srgb, ${theme.accent} 18%, transparent)`
          : 'none',
        fontFamily: theme.fontFamily,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-col gap-4">
          <div
            className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]"
            style={{ color: theme.textMuted }}
          >
            <span style={{ color: theme.accent }}>{dateLabel}</span>
            {status && (
              <>
                <span style={{ color: `color-mix(in srgb, ${theme.textMuted} 50%, transparent)` }}>•</span>
                <span>{status}</span>
              </>
            )}
          </div>

          <div>
            <h2 className="font-display text-3xl uppercase leading-[1.02] tracking-tight text-white sm:text-4xl">
              <Link href={`/projects/${slug}`}>{title}</Link>
            </h2>
            {description && (
              <p
                className="mt-4 max-w-2xl text-base leading-relaxed sm:text-[1.05rem]"
                style={{ color: theme.textMuted }}
              >
                {description}
              </p>
            )}
            {technologies && technologies.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-xl px-3 py-1.5 text-xs uppercase tracking-[0.24em]"
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
        </div>

        <CardShowcaseRail
          title={title}
          accent={theme.accent}
          accentMuted={theme.accentMuted}
          mutedText={theme.textMuted}
          thumb={thumb}
          blurDataURL={mainImage?.asset?.metadata?.lqip}
          logo={theme.logo}
          logoAlt={theme.logoAlt}
          primaryHref={`/projects/${slug}`}
          primaryLabel="Bekijk project"
          secondaryHref={website}
          secondaryLabel={website ? 'Bezoek' : undefined}
          secondaryExternal={true}
        />
      </div>
    </MotionCard>
  );
}

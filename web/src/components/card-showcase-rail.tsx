import Image from 'next/image';
import Link from 'next/link';

type CardShowcaseRailProps = {
  title: string;
  accent: string;
  accentMuted: string;
  mutedText: string;
  thumb?: string | null;
  blurDataURL?: string;
  logo?: string;
  logoAlt?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  secondaryExternal?: boolean;
};

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

type ActionButtonProps = {
  accent: string;
  href: string;
  label: string;
  mutedText: string;
  variant: 'primary' | 'secondary';
  external?: boolean;
};

function ActionButton({
  accent,
  href,
  label,
  mutedText,
  variant,
  external = false,
}: ActionButtonProps) {
  const isPrimary = variant === 'primary';
  const className =
    'inline-flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] transition-[transform,border-color,background-color,color] duration-200 hover:-translate-y-0.5';
  const style = isPrimary
    ? {
        backgroundColor: `color-mix(in srgb, ${accent} 16%, rgba(11,18,33,0.92))`,
        borderColor: `color-mix(in srgb, ${accent} 40%, transparent)`,
        color: '#ffffff',
      }
    : {
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`,
        color: mutedText,
      };

  const content = (
    <>
      <span>{label}</span>
      {external ? <ExternalIcon className="h-4 w-4" /> : <ArrowIcon className="h-4 w-4" />}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {content}
    </Link>
  );
}

export function CardShowcaseRail({
  title,
  accent,
  accentMuted,
  mutedText,
  thumb,
  blurDataURL,
  logo,
  logoAlt,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  secondaryExternal = false,
}: CardShowcaseRailProps) {
  return (
    <div
      className="grid gap-3 rounded-[1.6rem] border p-3 sm:grid-cols-[minmax(0,1fr)_12rem] sm:p-4"
      style={{
        backgroundColor: `color-mix(in srgb, ${accentMuted} 72%, rgba(11,18,33,0.7))`,
        borderColor: `color-mix(in srgb, ${accent} 18%, transparent)`,
      }}
    >
      <div
        className="relative min-h-[11rem] overflow-hidden rounded-[1.25rem] border"
        style={{
          borderColor: `color-mix(in srgb, ${accent} 22%, transparent)`,
          backgroundColor: 'rgba(11,18,33,0.78)',
        }}
      >
        {thumb ? (
          <div className="relative h-full min-h-[11rem] w-full overflow-hidden">
            <Image
              src={thumb}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 639px) 100vw, 420px"
              placeholder={blurDataURL ? 'blur' : 'empty'}
              blurDataURL={blurDataURL}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,18,0.1)_0%,rgba(5,10,18,0)_38%,rgba(5,10,18,0.72)_100%)]" />
          </div>
        ) : (
          <div
            className="h-full min-h-[11rem] w-full"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 26%, rgba(11,18,33,0.96)) 0%, rgba(11,18,33,0.92) 100%)`,
            }}
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
          {logo ? (
            <div
              className="rounded-2xl border p-1.5 backdrop-blur-md"
              style={{
                borderColor: `color-mix(in srgb, ${accent} 24%, transparent)`,
                backgroundColor: 'rgba(255,255,255,0.88)',
              }}
            >
              <Image
                src={logo}
                alt={logoAlt ?? `${title} logo`}
                width={36}
                height={36}
                className="rounded-xl"
              />
            </div>
          ) : (
            <span />
          )}

          <div
            className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{
              borderColor: `color-mix(in srgb, ${accent} 26%, transparent)`,
              backgroundColor: 'rgba(11,18,33,0.58)',
              color: '#ffffff',
            }}
          >
            Preview
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: mutedText }}
          >
            Live indruk
          </p>
          <p className="mt-1 max-w-[12rem] text-sm font-medium leading-snug text-white">
            {title}
          </p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-rows-2">
        <ActionButton
          accent={accent}
          href={primaryHref}
          label={primaryLabel}
          mutedText={mutedText}
          variant="primary"
        />
        {secondaryHref && secondaryLabel && (
          <ActionButton
            accent={accent}
            href={secondaryHref}
            label={secondaryLabel}
            mutedText={mutedText}
            variant="secondary"
            external={secondaryExternal}
          />
        )}
      </div>
    </div>
  );
}

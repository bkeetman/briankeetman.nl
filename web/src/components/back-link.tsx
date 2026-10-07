import Link from 'next/link';

type BackLinkProps = {
  href: string;
  label: string;
};

/** Floating back link, top-left on every subpage so it stays reachable while scrolling. */
export function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="fixed left-4 top-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-brand-dark/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-200 shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:border-brand-pink/60 hover:text-white sm:left-6 sm:top-6"
    >
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
        aria-hidden="true"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
      {label}
    </Link>
  );
}

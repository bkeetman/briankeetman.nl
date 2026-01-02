import Image from 'next/image';
import type { SVGProps } from 'react';
import Logo from '../../public/logo-briankeetman-nl.svg';

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen bk-bg-gradient">
      {/* Text section - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center min-h-[50vh] md:min-h-screen">
        {/* Logo centered */}
        <div className="mb-12">
          <Image alt="Logo" src={Logo} width={200} height={200} />
        </div>

        {/* Text content */}
        <div className="text-gray-200 w-full max-w-md text-center">
          <h1 className="mb-4 bk-heading-hero tracking-[0.02em]">
            Brian Keetman.nl
          </h1>
          <h2 className="mb-8 bk-heading-sub">
            Full-stack developer & builder
          </h2>

          <div className="space-y-8">
            <p className="text-base leading-relaxed text-gray-200">
              Zuidwesterringweg 34a
              <br />
              8309PH Tollebeek
              <br />
              info@briankeetman.nl
            </p>

            <p className="text-sm leading-relaxed text-gray-400">
              KVK: 90764048
              <br />
              BTW: NL004164420B26
            </p>

            <div className="flex justify-center">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-pink"
                href="https://www.linkedin.com/in/bkeetman"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Image section - full width on mobile, half on desktop */}
      <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-screen">
        <Image
          src="/background-ufo.webp"
          alt="Brian met robot"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          quality={90}
          loading="eager"
        />
      </div>
    </main>
  );
}

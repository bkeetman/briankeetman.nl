import Image from 'next/image';
import Link from 'next/link';

import { FadeIn, MotionCard, ShimmerLink } from '@/components/motion/patterns';

const ArrowLeft = ({ className }: { className?: string }) => (
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
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const ArrowUpRight = ({ className }: { className?: string }) => (
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
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
);

const services = [
  {
    title: 'Websites',
    description:
      'Snelle, onderhoudbare websites met een duidelijke uitstraling, sterke contentstructuur en moderne techniek.',
  },
  {
    title: 'Webapplicaties',
    description:
      'Webapps, dashboards, beheeromgevingen en koppelingen die aansluiten op hoe jouw bedrijf werkt.',
  },
  {
    title: 'Oplossingen',
    description:
      'Ik denk mee, ontwerp en bouw praktische digitale oplossingen voor bedrijven met een concreet probleem.',
  },
];

const process = [
  {
    step: '01',
    title: 'Gesprek',
    description:
      'We beginnen met een gesprek over je bedrijf, het probleem, de wensen en wat een goede oplossing moet opleveren.',
  },
  {
    step: '02',
    title: 'Offerte',
    description:
      'Daarna maak ik een uitgebreide offerte met de afspraken, scope, planning en kosten zo duidelijk mogelijk op papier.',
  },
  {
    step: '03',
    title: 'Fine-tunen',
    description:
      'We lopen de offerte samen door en scherpen hem aan totdat duidelijk is wat we wel en niet gaan bouwen.',
  },
  {
    step: '04',
    title: 'Bouwen',
    description:
      'Ik ontwerp en bouw de website of webapplicatie. Na oplevering volgt de factuur; extra werk kan daarna op uurbasis.',
  },
];

const stack = [
  'Next.js',
  'Moderne webapplicaties',
  'Maatwerk',
  'Snelle hosting',
  'Uitbreidbaar beheer',
];

const portfolio = [
  {
    title: 'Camping Fiederels',
    label: 'Website',
    description:
      'Een frisse website voor een camping, verblijfslocatie en bikepark in Bant, met duidelijke routes naar boeken, verblijven en buitenactiviteiten.',
    href: 'https://www.campingfiederels.nl/',
    image: '/portfolio/client-sites/camping-fiederels.jpg',
    technologies: ['Website', 'Reserveren', 'Content'],
  },
  {
    title: 'Made by My Brother',
    label: 'Website',
    description:
      'Een warme, ambachtelijke website voor handgemaakte houten meubels uit Emmeloord, met ruimte voor werkwijze, producten en recent werk.',
    href: 'https://www.madebymybrother.nl/',
    image: '/portfolio/client-sites/made-by-my-brother.jpg',
    technologies: ['Website', 'Producten', 'Contact'],
  },
];

export const metadata = {
  title: 'Diensten | Brian Keetman',
  description:
    'Websites, webapplicaties en moderne digitale oplossingen voor bedrijven, gebouwd met Next.js, Vercel en een praktische full-stack aanpak.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bk-bg-gradient text-white">
      <section className="flex min-h-screen flex-col lg:flex-row">
        <div className="relative w-full flex-shrink-0 overflow-hidden lg:w-1/2">
          <Image
            src="/background.webp"
            alt="Werkplek van Brian"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/90 via-brand-dark/68 to-brand-dark/35" />
          <div className="relative z-10 flex min-h-[100svh] flex-col justify-between gap-10 p-8 pt-12 lg:min-h-screen lg:p-12">
            <FadeIn className="w-fit">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-200 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Terug naar home
              </Link>
            </FadeIn>

            <FadeIn delay={0.08} className="max-w-xl">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
                Diensten
              </p>
              <h1 className="bk-heading-hero leading-[1.02] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                Websites En Webapplicaties
              </h1>
              <p className="mt-5 text-base leading-relaxed text-gray-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-lg">
                Ik ontwerp en bouw moderne websites en webapplicaties voor
                bedrijven die een praktische digitale oplossing nodig hebben.
                Van eerste idee tot werkend product.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ShimmerLink
                  href="mailto:info@briankeetman.nl"
                  className="justify-center sm:justify-start"
                >
                  Plan een kennismaking
                </ShimmerLink>
                <ShimmerLink
                  href="#portfolio"
                  pulse={false}
                  className="justify-center sm:justify-start"
                >
                  Bekijk voorbeelden
                </ShimmerLink>
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="w-full flex-shrink-0 overflow-y-auto bg-transparent lg:h-screen lg:w-1/2">
          <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8 sm:py-16 lg:px-16 xl:px-20">
            <FadeIn>
              <div className="border-b border-white/10 pb-10">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
                  Wat ik maak
                </p>
                <h2 className="mt-3 bk-heading-sub text-4xl sm:text-5xl">
                  Van bedrijfsvraag naar werkend product
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
                  Ik combineer meedenken, ontwerpen en development. Daardoor
                  ontstaat er geen losse techniek, maar een oplossing die past
                  bij je bedrijf en duidelijk is afgesproken.
                </p>
              </div>
            </FadeIn>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {services.map((service, index) => (
                <MotionCard
                  key={service.title}
                  delay={index * 0.05}
                  glow
                  className="rounded-2xl border border-white/10 bg-brand-dark/70 p-5 ring-1 ring-white/5 transition-colors hover:border-brand-pink/50"
                >
                  <h3 className="font-display text-2xl uppercase leading-none tracking-hero text-brand-pink">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-gray-300">
                    {service.description}
                  </p>
                </MotionCard>
              ))}
            </div>

            <section className="mt-16">
              <FadeIn>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
                  Werkwijze
                </p>
                <h2 className="mt-3 bk-heading-sub text-4xl sm:text-5xl">
                  Eerst duidelijkheid, dan bouwen
                </h2>
              </FadeIn>

              <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                {process.map((item, index) => (
                  <FadeIn key={item.step} delay={index * 0.04}>
                    <div className="grid gap-4 py-6 sm:grid-cols-[80px_1fr]">
                      <span className="font-display text-3xl uppercase leading-none tracking-hero text-brand-pink">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <FadeIn>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
                  Stack
                </p>
                <h2 className="mt-3 bk-heading-sub text-4xl sm:text-5xl">
                  Moderne techniek, netjes opgebouwd
                </h2>
                <p className="mt-5 text-base leading-relaxed text-gray-300">
                  Ik bouw websites en webapplicaties met een moderne basis.
                  Denk aan Next.js, snelle hosting en maatwerk dat later netjes
                  uit te breiden is.
                </p>
              </FadeIn>

              <div className="mt-7 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section id="portfolio" className="mt-16 scroll-mt-8">
              <FadeIn>
                <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
                      Portfolio
                    </p>
                    <h2 className="mt-3 bk-heading-sub text-4xl sm:text-5xl">
                      Websites die live staan
                    </h2>
                  </div>
                  <p className="max-w-xs text-sm leading-relaxed text-gray-400 sm:text-right">
                    Een kleine selectie van klantwerk dat online te bekijken is.
                  </p>
                </div>
              </FadeIn>

              <div className="mt-8 grid gap-5">
                {portfolio.map((item, index) => (
                  <MotionCard
                    key={item.title}
                    delay={index * 0.05}
                    className="group rounded-2xl border border-white/10 bg-brand-dark/70 p-4 ring-1 ring-white/5 transition-colors hover:border-brand-pink/50"
                  >
                    <Link
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid gap-5 md:grid-cols-[minmax(0,260px)_1fr]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-white/5">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 260px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-transparent to-transparent opacity-70" />
                      </div>
                      <div className="flex min-w-0 flex-col justify-center">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                          <span className="text-brand-pink">{item.label}</span>
                          <span className="text-gray-600">-</span>
                          <span>Live</span>
                        </div>
                        <div className="mt-3 flex items-start justify-between gap-4">
                          <h3 className="font-display text-3xl uppercase leading-none tracking-hero text-white transition-colors group-hover:text-brand-pink">
                            {item.title}
                          </h3>
                          <ArrowUpRight className="mt-1 h-5 w-5 flex-shrink-0 text-brand-pink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-gray-300">
                          {item.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-wide text-gray-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </MotionCard>
                ))}
              </div>
            </section>

            <FadeIn>
              <section className="mt-16 border-t border-white/10 pt-10">
                <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
                  Startpunt
                </p>
                <h2 className="mt-3 bk-heading-sub text-4xl sm:text-5xl">
                  Een idee of bestaande site?
                </h2>
                <p className="mt-5 text-base leading-relaxed text-gray-300">
                  Stuur kort wat je wilt bouwen of verbeteren. Ik denk mee over
                  de eerste versie, de techniek en welke stappen logisch zijn.
                </p>
                <div className="mt-7">
                  <ShimmerLink href="mailto:info@briankeetman.nl" pulse={false}>
                    Mail info@briankeetman.nl
                  </ShimmerLink>
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}

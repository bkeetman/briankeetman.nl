import AnimationDemos from './animation-demos';

export default function StyleGuide() {
  return (
    <div className="min-h-screen text-white font-sans bk-bg-gradient">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
        <header className="border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
            Brand style
          </p>
          <h1 className="mt-2 bk-heading-hero">
            Brian Keetman.nl
          </h1>
          <h2 className="mt-2 bk-heading-sub">
            Full-stack developer & builder
          </h2>
          <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-gray-200">
            Direct, technisch en zonder bullshit. Web, infra, AI-tooling en
            alles daartussen.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="inline-flex items-center rounded-full bg-brand-pink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-brand-dark hover:bg-pink-500 transition">
              Contact
            </button>
            <button className="inline-flex items-center rounded-full border border-white/40 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white hover:bg-white/5 transition">
              Portfolio
            </button>
          </div>
        </header>

        <section className="space-y-4">
          <h3 className="font-display text-2xl tracking-tight text-brand-pink uppercase">
            Headings (utilities)
          </h3>
          <p className="text-sm text-gray-400">
            Gebruik <code className="text-brand-pink">bk-heading-hero</code> voor grote titels en{' '}
            <code className="text-brand-pink">bk-heading-sub</code> voor onderkoppen. Beide zitten in{' '}
            <code className="text-brand-pink">globals.css</code>.
          </p>
          <div className="space-y-3">
            <h1 className="bk-heading-hero text-4xl">
              H1 – Page title
            </h1>
            <h2 className="bk-heading-sub text-3xl">
              H2 – Section title
            </h2>
            <h3 className="font-sans text-2xl font-semibold text-brand-pink">
              H3 – Subsection title
            </h3>
            <h4 className="font-sans text-xl font-semibold text-gray-100">
              H4 – Smaller heading
            </h4>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="font-display text-2xl tracking-tight text-brand-pink uppercase">
            Body
          </h3>
          <p className="text-base leading-relaxed text-gray-200">
            Dit is standaard bodytekst. Geschreven in{' '}
            <span className="font-semibold">Inter</span>.
          </p>
          <p className="text-sm leading-relaxed text-gray-400">
            Dit is secundaire tekst—ondertitels en kleine toelichtingen.
          </p>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-2xl tracking-tight text-brand-pink uppercase">
            Kleuren
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-brand-pink p-4 text-brand-dark">
              <p className="text-xs uppercase tracking-wide">Brand Pink</p>
              <p className="text-sm font-mono">#d5147b</p>
            </div>
            <div className="rounded-xl bg-brand-dark p-4 text-gray-200 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-wide">Brand Dark</p>
              <p className="text-sm font-mono">#1a1919</p>
            </div>
            <div className="rounded-xl bg-brand-light p-4 text-brand-dark">
              <p className="text-xs uppercase tracking-wide">Brand Light</p>
              <p className="text-sm font-mono">#fdf2ff</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="font-display text-2xl tracking-tight text-brand-pink uppercase">
            Componenten
          </h3>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                Blog kaart
              </p>
              <article className="group rounded-2xl border border-white/10 bg-brand-dark p-4">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-gray-500">
                  <span className="text-brand-pink">12 jan 2025</span>
                  <span className="text-gray-700">•</span>
                  <span>Tech</span>
                </div>
                <h4 className="mt-4 font-display text-2xl text-white uppercase leading-tight group-hover:text-brand-pink transition-colors">
                  Hoe ik Sanity embed in Next.js
                </h4>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Kleine checklist voor schema’s, visual editing en caching.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-pink">
                  Lees artikel
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </article>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
                Portfolio kaart
              </p>
              <article className="rounded-2xl border border-white/10 bg-brand-dark p-4">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-gray-500">
                  <span className="text-brand-pink">2024</span>
                  <span className="text-gray-700">•</span>
                  <span>Farmtrade</span>
                </div>
                <h4 className="mt-3 font-display text-2xl text-white uppercase leading-tight">
                  Webapp voor agrarische handel
                </h4>
                <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Responsieve webversie met realtime zoekfilters en beheer.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Next.js', 'React', 'Tailwind'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[11px] uppercase tracking-wide rounded-full bg-white/10 text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
              Codeblok
            </p>
            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0b1221]">
              <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-[1.5] text-slate-100">
                <span className="mb-2 inline-block text-[11px] uppercase tracking-[0.14em] text-slate-400">
                  typescript
                </span>
                <code className="block space-y-1">
                  <div className="font-mono text-slate-100">type Post = &#123;</div>
                  <div className="pl-4 font-mono">
                    <span className="text-brand-pink">title</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-amber-100">string</span>
                    <span className="text-slate-500">;</span>
                  </div>
                  <div className="pl-4 font-mono">
                    <span className="text-brand-pink">publishedAt</span>
                    <span className="text-slate-500">: </span>
                    <span className="text-amber-100">string</span>
                    <span className="text-slate-500">;</span>
                  </div>
                  <div className="font-mono text-slate-100">&#125;;</div>
                  <div className="font-mono text-slate-100">
                    const <span className="text-brand-pink">formatDate</span>
                    <span className="text-slate-500"> = </span>(date: string) =&gt; new Date(date).toDateString();
                  </div>
                </code>
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl tracking-tight text-brand-pink uppercase">
              Animaties (motion.dev)
            </h3>
            <span className="text-[11px] uppercase tracking-[0.25em] text-gray-400">
              Subtiel & professioneel
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            Micro-animaties houden het strak: snelle ease-out reveals, lichte hover-lifts en
            een subtiele glans op CTA&apos;s. Alles draait op <span className="font-semibold text-brand-pink">motion.dev</span>
            {' '}zonder overkill.
          </p>

          <AnimationDemos />
        </section>
      </div>
    </div>
  );
}

export default function StyleGuide() {
  return (
    <div className="min-h-screen bg-brand-dark-light text-white font-sans">
      <div className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-12">
        <header className="border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-pink">
            Brand style
          </p>
          <h1 className="mt-2 font-display text-5xl md:text-6xl tracking-tightest text-brand-pink uppercase">
            Brian Keetman.nl
          </h1>
          <h2 className="mt-2 font-display text-3xl md:text-4xl tracking-tight text-white uppercase">
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
            Headings
          </h3>
          <div className="space-y-3">
            <h1 className="font-display text-4xl tracking-tightest text-brand-pink uppercase">
              H1 – Page title
            </h1>
            <h2 className="font-display text-3xl tracking-tight text-white uppercase">
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
      </div>
    </div>
  );
}


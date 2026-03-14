# Projects Branded Cards — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give each project card on `/projects` its own visual identity (accent color, logo, branded glow) driven by a frontend theme config, while keeping all content in Sanity.

**Architecture:** A `projectThemes.ts` config maps slug → `{ accent, logo, gradient }`. The projects index and detail pages read this config to apply per-project styling. Projects without a theme entry fall back to `brand-pink`. No Sanity schema changes needed.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, TypeScript, motion/react

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `web/src/lib/projectThemes.ts` | **Create** | Theme config: slug → accent, logo path, gradient |
| `web/public/projects/dingetje-logo.png` | **Add** | Dingetje.app logo asset |
| `web/public/projects/folio-logo.png` | **Add** | Folio logo asset |
| `web/src/app/projects/page.tsx` | **Modify** | Branded cards using theme |
| `web/src/app/projects/[slug]/page.tsx` | **Modify** | Themed header + accent color |

---

## Chunk 1: Theme Config + Assets

### Task 1: Create projectThemes.ts

**Files:**
- Create: `web/src/lib/projectThemes.ts`

- [ ] **Step 1: Create the file**

```ts
// web/src/lib/projectThemes.ts

export type ProjectTheme = {
  accent: string;
  accentMuted: string;    // e.g. accent at 15% opacity, for backgrounds
  logo?: string;          // path relative to /public
  logoAlt?: string;
};

const themes: Record<string, ProjectTheme> = {
  dingetje: {
    accent: '#f97316',
    accentMuted: 'rgba(249,115,22,0.12)',
    logo: '/projects/dingetje-logo.png',
    logoAlt: 'Dingetje logo',
  },
  folio: {
    accent: '#6366f1',
    accentMuted: 'rgba(99,102,241,0.12)',
    logo: '/projects/folio-logo.png',
    logoAlt: 'Folio logo',
  },
};

const fallback: ProjectTheme = {
  accent: '#d5147b',
  accentMuted: 'rgba(213,20,123,0.12)',
};

export function getProjectTheme(slug: string): ProjectTheme {
  return themes[slug] ?? fallback;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd web && npx tsc --noEmit
```
Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add web/src/lib/projectThemes.ts
git commit -m "feat: add project theme config for branded cards"
```

---

### Task 2: Add project logo assets

**Files:**
- Create: `web/public/projects/dingetje-logo.png`
- Create: `web/public/projects/folio-logo.png`

- [ ] **Step 1: Create the public/projects directory and fetch logos**

Fetch the Dingetje logo from `https://dingetje.app` — look for `dingetje.png` or favicon in the page source. Save it to `web/public/projects/dingetje-logo.png`.

Fetch the Folio logo from `https://bkeetman.github.io/folio/` — look for `folio-icon.png`. Save it to `web/public/projects/folio-logo.png`.

If fetching fails, create placeholder 64×64 PNG files manually or ask the user to drop the files in `web/public/projects/`.

- [ ] **Step 2: Verify files exist**

```bash
ls web/public/projects/
```
Expected: `dingetje-logo.png  folio-logo.png`

- [ ] **Step 3: Commit**

```bash
git add web/public/projects/
git commit -m "feat: add project logo assets for dingetje and folio"
```

---

## Chunk 2: Branded Index Cards

### Task 3: Update projects index page with branded cards

**Files:**
- Modify: `web/src/app/projects/page.tsx`

The current card is a `MotionCard` with hardcoded `border-white/10` and `hover:border-brand-pink/60`. We replace the inner card styling with theme-driven inline styles, keeping the `MotionCard` wrapper for animation.

- [ ] **Step 1: Import getProjectTheme in the index page**

At the top of `web/src/app/projects/page.tsx`, add:

```ts
import { getProjectTheme } from '@/lib/projectThemes';
import NextImage from 'next/image'; // already imported as Image, keep as-is
```

- [ ] **Step 2: Replace the card rendering block**

Find the `return (` inside the `.map()` starting at line ~117 and replace the entire `MotionCard` with:

```tsx
const theme = getProjectTheme(slug);

return (
  <MotionCard
    key={slug}
    delay={index * 0.05}
    className="group relative overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-200"
    style={{
      borderColor: `color-mix(in srgb, ${theme.accent} 25%, transparent)`,
      backgroundColor: theme.accentMuted,
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${theme.accent} 60%, transparent)`;
      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px color-mix(in srgb, ${theme.accent} 20%, transparent)`;
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${theme.accent} 25%, transparent)`;
      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
    }}
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
            alt={theme.logoAlt ?? item.title}
            width={32}
            height={32}
            className="rounded-md opacity-90"
          />
        )}
      </div>

      {/* Title + description */}
      <div>
        <h2 className="bk-heading-sub text-3xl sm:text-4xl mb-3 leading-[1.05] transition-colors"
          style={{ color: 'white' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = theme.accent; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'white'; }}
        >
          <Link href={`/projects/${slug}`}>{item.title}</Link>
        </h2>
        {item.description && (
          <p className="text-gray-200 text-base leading-relaxed">{item.description}</p>
        )}
        {item.technologies && item.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {item.technologies.map((tech) => (
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
          {item.website && (
            <a
              href={item.website}
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
            <Image src={thumb} alt={item.title} fill className="object-cover" sizes="112px"
              placeholder={item.mainImage?.asset?.metadata?.lqip ? 'blur' : 'empty'}
              blurDataURL={item.mainImage?.asset?.metadata?.lqip}
            />
          </div>
        )}
      </div>
    </div>
  </MotionCard>
);
```

- [ ] **Step 3: Build to verify no TypeScript/JSX errors**

```bash
cd web && npm run build 2>&1 | tail -20
```
Expected: `✓ Compiled successfully` or `Route (app) ...` listing, no red errors

- [ ] **Step 4: Start dev server and visually verify**

```bash
cd web && npm run dev
```
Open `http://localhost:3000/projects`. Verify:
- Dingetje card has orange accent border + tech tags
- Folio card has indigo accent
- Default projects use brand-pink fallback
- Logos appear top-right of card (if assets exist)
- "Bezoek" external link appears when `website` is set

- [ ] **Step 5: Commit**

```bash
git add web/src/app/projects/page.tsx
git commit -m "feat: branded project cards with per-project theme colors"
```

---

## Chunk 3: Themed Detail Page

### Task 4: Update project detail page with themed header

**Files:**
- Modify: `web/src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Import getProjectTheme**

Add to top of `web/src/app/projects/[slug]/page.tsx`:

```ts
import { getProjectTheme } from '@/lib/projectThemes';
import NextImage from 'next/image'; // already imported
```

- [ ] **Step 2: Get theme after fetching the item**

After `const item = await getProjectBySlug(slug);` (around line 108), add:

```ts
const theme = getProjectTheme(stegaClean(item.slug));
```

Also add at top: `import { stegaClean } from '@sanity/client/stega';`

- [ ] **Step 3: Replace hardcoded brand-pink colors with theme.accent**

Make these targeted replacements in the detail page JSX:

**Logo in header** — add after the `<h1>` title block (inside `<header>`):
```tsx
{theme.logo && (
  <div className="flex items-center gap-3 mb-6">
    <Image
      src={theme.logo}
      alt={theme.logoAlt ?? item.title}
      width={40}
      height={40}
      className="rounded-lg"
    />
  </div>
)}
```

**Date/status color** — replace `className="text-brand-pink"` on the `<time>` and `<span>` elements:
```tsx
// Before:
<time dateTime={item.startedAt} className="text-brand-pink">
// After:
<time dateTime={item.startedAt} style={{ color: theme.accent }}>

// Same for the non-date span:
<span className="text-brand-pink">{dateLabel}</span>
// becomes:
<span style={{ color: theme.accent }}>{dateLabel}</span>
```

**"Bezoek project" button** — replace the hardcoded pink classes:
```tsx
// Before:
className="inline-flex items-center gap-2 rounded-full border border-brand-pink/60 bg-brand-pink/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-brand-pink transition hover:bg-brand-pink/25 hover:border-brand-pink"
// After — use inline styles:
className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition"
style={{
  borderColor: `color-mix(in srgb, ${theme.accent} 60%, transparent)`,
  backgroundColor: `color-mix(in srgb, ${theme.accent} 15%, transparent)`,
  color: theme.accent,
}}
```

**Tech tags** — same pattern as the index page, replace `bg-white/5 border-white/10 text-gray-300` with theme-tinted versions:
```tsx
style={{
  backgroundColor: `color-mix(in srgb, ${theme.accent} 10%, transparent)`,
  borderColor: `color-mix(in srgb, ${theme.accent} 25%, transparent)`,
  color: theme.accent,
}}
```

- [ ] **Step 4: Build to verify**

```bash
cd web && npm run build 2>&1 | tail -20
```
Expected: no errors

- [ ] **Step 5: Visually verify**

Open `http://localhost:3000/projects/dingetje` (or whichever slug exists in Sanity).
- Header date/status in orange
- "Bezoek project" button in orange
- Tech tags tinted orange
- Folio detail shows indigo equivalents

- [ ] **Step 6: Commit**

```bash
git add web/src/app/projects/[slug]/page.tsx
git commit -m "feat: themed project detail page with per-project accent colors"
```

---

## Notes

- `color-mix(in srgb, ...)` is supported in all modern browsers and works without Tailwind config changes
- If logo assets can't be fetched automatically, drop them manually in `web/public/projects/` — the theme config will pick them up without any code changes
- Adding a new project theme: add an entry to `projectThemes.ts` and optionally drop a logo in `web/public/projects/`

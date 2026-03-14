# Projects Section — Design Spec
*2026-03-14*

## Scope

Add a visually distinctive **Projects** section to briankeetman.nl that showcases Brian's own ongoing projects (dingetje.app, Folio, open source). Each project gets its own visual identity through a frontend theme config. Separate from the existing **Portfolio** section (client work).

---

## Content vs Design split

| Layer | Responsibility |
|---|---|
| Sanity | Title, description, technologies, website URL, status, startedAt, mainImage, body (PortableText) |
| Frontend (`projectThemes.ts`) | accentColor, logo path, gradient, brand personality per slug |

Content is CMS-managed. Design is code-managed. A project without a theme entry falls back to the default `brand-pink` site style.

---

## Architecture

```
web/src/
├── lib/
│   └── projectThemes.ts          # slug → { accent, logo, gradient }
├── app/projects/
│   ├── page.tsx                  # index — branded cards
│   └── [slug]/page.tsx           # detail — themed header + accents
```

### projectThemes.ts shape

```ts
type ProjectTheme = {
  accent: string;        // hex, e.g. '#f97316'
  gradient: string;      // tailwind gradient classes or CSS
  logo?: string;         // path to logo in /public
}
```

---

## Projects index page

Layout unchanged: split design (hero left, list right).

Card changes per project:
- Background: dark base with subtle accent-color tint
- Border + glow: accent color, stronger on hover
- Logo: shown in card header
- Screenshot: via Sanity `mainImage`, shown as visual element
- Content: title, description, tech tags, status badge, "Bekijk project" link
- External link: direct link to project website alongside internal detail link

---

## Project detail page

Layout unchanged: sticky image left, content right.

Theme changes:
- Heading and highlight colors replaced with `accent` from theme
- "Bezoek project" button in accent color
- Logo visible in header area
- Body content via existing Sanity PortableText renderer

---

## Project themes

### Dingetje.app (`slug: dingetje`)
- Accent: `#f97316` (vibrant orange)
- Feel: dark, frosted glass, modern and direct
- Card: orange glow/border, dark background with subtle orange tint
- Logo: `dingetje.png`

### Folio (`slug: folio`)
- Accent: `#6366f1` (indigo)
- Feel: calm, minimal, privacy-focused
- Card: indigo tint, clean and understated
- Logo: `folio-icon.png`

### Default fallback
- Accent: `#d5147b` (brand-pink)
- No logo

---

## Portfolio section (unchanged)

Client work remains in its own section. Presented in Brian's site style (brand-pink accents), with description and screenshots. No per-project theming needed.

---

## Out of scope

- Project updates as separate entries (deferred — body PortableText handles this for now)
- Fully Sanity-configurable theming
- Portfolio section changes

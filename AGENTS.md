# Frontend Style Guide (AI Helper Notes)

- Global background: use the layered radial gradient already set on the `<body>` in `src/app/layout.tsx` (`bg-[radial-gradient(circle_at_20%_20%,rgba(213,20,123,0.12),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(116,47,255,0.12),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(18,168,168,0.12),transparent_26%)]`). Keep new pages/sections on the brand dark base so the gradient shows through.
- Code blocks: use the shared renderer in `src/components/portable-text.tsx` (minimal container, dark background #0b1221, subtle language label, key/value tinting, line-height 1.5). Prose styles for blog/portfolio already set to transparent pre backgrounds—don’t reintroduce heavy borders/shadows.
- Components reference: see `src/app/style/page.tsx` for ready-made blog card, portfolio card, and code block samples. When building new UI, follow these patterns (uppercase headings, tight tracking, brand pink accents, soft rounded borders).
- Keep Visual Editing lightweight: draft mode overlays should be opt-in per page (see blog index). Avoid global draftMode hooks in shared layouts.

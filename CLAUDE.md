# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Brian Keetman built with Next.js 15 (App Router), Tailwind CSS v4, and Sanity CMS. The project uses a monorepo structure with two main directories:

- `web/` - Next.js frontend application
- `studio/` - Standalone Sanity Studio for content management

## Development Commands

### Web Application (Next.js)
```bash
cd web
npm install          # Install dependencies
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Sanity Studio
```bash
cd studio
npm install          # Install dependencies
npm run dev          # Start Sanity Studio (http://localhost:3333)
npm run deploy       # Deploy Studio to Sanity hosting
npm run build        # Build Studio to ./dist
npm run schema       # Deploy schema to Sanity
```

## Architecture

### Monorepo Structure
The project is split into two independent applications:
- **web/**: Next.js site with its own package.json, deployed to Vercel
- **studio/**: Sanity Studio with its own package.json, can be deployed separately

### Content Management (Sanity)
The application uses Sanity CMS with two main content types:
- **Posts** (`post`): Blog posts with title, slug, description, publishedAt, mainImage, and rich text body
- **Portfolio Items** (`portfolio`): Portfolio projects with title, slug, description, date, client, technologies, website, mainImage, and rich text body

Content is fetched via GROQ queries defined in `web/src/sanity/lib/queries.ts` and accessed through helper functions in `web/src/sanity/lib/content.ts`:
- `getPosts()` / `getPostBySlug(slug)` / `getPostSlugs()`
- `getPortfolioItems()` / `getPortfolioItemBySlug(slug)` / `getPortfolioSlugs()`

All content queries use tag-based revalidation for cache management.

### Revalidation System
The webhook endpoint at `web/src/app/api/revalidate/route.ts` accepts POST requests from Sanity webhooks to purge cached content. Authentication uses `x-sanity-secret` header (matches `SANITY_REVALIDATE_SECRET` env var). The endpoint revalidates Next.js cache tags based on content type (`post` or `portfolio`) and slug.

### Portable Text Rendering
Rich text content from Sanity is rendered using a custom PortableText component in `web/src/components/portable-text.tsx`. It includes custom serializers for:
- **Images**: Next.js Image component with LQIP blur placeholders, 1600px max width
- **Code blocks**: Dark theme (#0b1221 bg), language label, key-value syntax highlighting (keys in brand pink, values in amber)
- **Links**: Support for `openInNewTab` with proper rel attributes

### Styling System

**Brand Colors** (defined in Tailwind config):
- `brand-pink`: #d5147b (primary accent)
- `brand-dark`: #1a1919
- `brand-dark-light`: #2a2a2a (base background)
- `brand-light`: #fdf2ff

**Typography**:
- Display font: Bebas Neue (uppercase headings, tight tracking)
- Body font: Inter (300-700 weights)
- Font variables: `--font-inter`, `--font-bebas-neue`

**Global Background**: The `<body>` element in `web/src/app/layout.tsx` has a layered radial gradient effect (`.bk-bg-gradient`) with brand colors at 12% opacity. Keep new pages/sections on transparent or dark backgrounds so this gradient shows through.

**Heading Classes**:
- `.bk-heading-hero`: Hero text (Bebas Neue, brand pink, 4xl-7xl responsive)
- `.bk-heading-sub`: Sub-heading (Bebas Neue, white, 2xl-3xl)
- `h1-h4` elements have semantic defaults applied globally

**Code Block Styling**: Use the shared portable-text renderer for consistency. Code blocks have minimal container styling, dark backgrounds, subtle language labels, and key-value tinting.

### Content Types & Schema
Sanity schema types are defined in `studio/schemaTypes/`:
- `documents/post.ts` - Blog post schema
- `documents/portfolio.ts` - Portfolio item schema
- `objects/blockContent.ts` - Rich text configuration

TypeScript types are defined in `web/src/sanity/types.ts` (`Post`, `PortfolioItem`, `SanityImageWithMetadata`).

### Visual Editing
The site supports Sanity Visual Editing for draft content preview. Draft mode is opt-in per page using Next.js draft mode. See blog index implementation for reference. Avoid adding global draftMode hooks in shared layouts to keep the feature lightweight.

## Key Files

- `web/src/sanity/lib/content.ts` - Content fetching helper functions
- `web/src/sanity/lib/queries.ts` - GROQ queries for all content types
- `web/src/sanity/lib/live.ts` - Sanity fetch wrapper with caching/revalidation config
- `web/src/components/portable-text.tsx` - Portable Text renderer with custom components
- `web/src/app/style/page.tsx` - Style guide with ready-made UI component examples
- `AGENTS.md` - Frontend style guide with specific notes for AI assistants

## Environment Variables

Required for the web application:
- `SANITY_REVALIDATE_SECRET` - Secret for webhook authentication

## Deployment

- **Web**: Auto-deployed to Vercel on push to `main` branch
- **Studio**: Can be deployed independently to Sanity hosting via `npm run deploy`

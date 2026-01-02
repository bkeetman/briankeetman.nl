# briankeetman.nl

Personal website of Brian Keetman - Full-stack developer & builder.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Bebas Neue (display) & Inter (body)
- **Deployment**: [Vercel](https://vercel.com)

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── blog/         # Blog posts
│   ├── style/        # Style guide page
│   └── page.tsx      # Home page
├── components/       # React components
│   └── ui/           # UI components
└── lib/              # Utility functions
    └── posts.ts      # Blog post utilities
```

## Brand Colors

- **Brand Pink**: `#d5147b`
- **Brand Dark**: `#1a1919`
- **Brand Dark Light**: `#2a2a2a` (background)
- **Brand Light**: `#fdf2ff`

## Deployment

This project is deployed on [Vercel](https://vercel.com). The repository is connected to Vercel for automatic deployments on push to the `main` branch.

## Sanity Studio & Content Webhook

- Structure: `web/` (Next.js site) and `studio/` (standalone Sanity Studio).
- Revalidation endpoint: `web/src/app/api/revalidate/route.ts` (expects `SANITY_REVALIDATE_SECRET`).

Add a webhook in Sanity to purge the Next.js cache after publishing:
1. In Sanity Studio: Settings → API → Webhooks → “Create”.
2. URL: `https://<your-site>/api/revalidate` (or dev URL).
3. Method: POST, Body (JSON):
   ```json
   { "secret": "<same-as-SANITY_REVALIDATE_SECRET>", "type": "post", "slug": "{slug.current}" }
   ```
   Use `"type": "portfolio"` for portfolio items. Content-Type: `application/json`.
4. Trigger on publish/unpublish for `post` and `portfolio`.

## License

Private project - All rights reserved.

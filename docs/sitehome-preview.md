# SiteHome test website preview

All website changes stay on `sitehome/test-preview`. Existing production environment files, Vercel projects, domains and credentials are unchanged. The active customer preview uses only the isolated Sanity project `ek05qcgq` and dataset `sitehome-test`.

## Local preview

From the repository root:

```sh
node scripts/sitehome-preview.mjs dev --isolated
node scripts/sitehome-preview.mjs build --isolated
node scripts/sitehome-preview.mjs start --isolated
```

The development URL is `http://localhost:3101/portfolio/farmtrade`. The wrapper applies process-scoped overrides, uses `.next-sitehome-isolated`, disables the CDN and clears the production read token/revalidation secret. Existing environment files are not edited. Without `--isolated`, the older local test dataset in the original project is selected; that mode is not the hosted customer preview.

## Hosted preview

Use the separate Vercel project `sitehome-test-website`, never the production website or Studio project. Deploy a clean archive of committed, tracked `web/` files from this branch. Do not upload ignored environment files, `.vercel`, build output or a local CLI session. No automatic Git connection is configured, so the production/default Git branch cannot silently become this preview's source.

Use `web/vercel.sitehome-preview.json` for the dedicated build. Its wrapper forces the isolated project/test dataset and empty credential values; configure the same public binding and preview flags at runtime. The target is a public published-content preview and needs no CMS credential. `SITEHOME_PREVIEW_URL` is the separate preview origin. Node 24 is configured only on this new project.

Preview mode checks the binding, bypasses CMS caching, disables draft-mode enable/revalidation endpoints, adds a visible “SiteHome · Testpreview” bar, emits `noindex, nofollow`, disallows robots and returns an empty sitemap. Production rendering, TypeScript config and default build command are retained when preview mode is absent. The test build uses an extended TypeScript config with ES2017 to support the installed TypeScript 6 without changing the production config.

Local build and publication-result verification are recorded in SiteHome's existing issues #5/#6. A deployed preview is not evidence of an owner mobile acceptance test; authenticated edit → review → explicit confirmation and physical phone behavior remain separate gates.

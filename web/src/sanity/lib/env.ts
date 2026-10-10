const missingEnv = (name: string) => {
  throw new Error(`Missing required environment variable: ${name}`);
};

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? missingEnv('NEXT_PUBLIC_SANITY_PROJECT_ID');

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? missingEnv('NEXT_PUBLIC_SANITY_DATASET');

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-31';

export const useCdn = process.env.SANITY_USE_CDN !== 'false';

// SiteHome preview must never fall back to production.
if (process.env.SITEHOME_TEST_PREVIEW === 'true' &&
    (projectId !== (process.env.SITEHOME_ISOLATED_PREVIEW === 'true' ? 'ek05qcgq' : 'fzn0qzqj') || dataset !== 'sitehome-test')) {
  throw new Error('SiteHome preview requires its explicit test project and sitehome-test');
}

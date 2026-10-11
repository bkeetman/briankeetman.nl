const testPreview = process.env.SITEHOME_TEST_PREVIEW === 'true';
const isolatedPreview = process.env.SITEHOME_ISOLATED_PREVIEW === 'true';
if (testPreview && (process.env.NEXT_PUBLIC_SANITY_DATASET !== 'sitehome-test' ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== (isolatedPreview ? 'ek05qcgq' : 'fzn0qzqj'))) {
  throw new Error('SiteHome preview requires its explicit test project and sitehome-test');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(testPreview && isolatedPreview
    ? { distDir: '.next-sitehome-isolated' } : {}),
  ...(testPreview ? { typescript: { tsconfigPath: 'tsconfig.sitehome-preview.json' } } : {}),
  ...(testPreview ? { headers: async () => [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }] } : {}),
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(process.env.SITEHOME_TEST_PREVIEW === 'true' && process.env.SITEHOME_ISOLATED_PREVIEW === 'true'
    ? { distDir: '.next-sitehome-isolated' } : {}),
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

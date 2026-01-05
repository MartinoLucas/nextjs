import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Either use "domains" or "remotePatterns". remotePatterns is more precise.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        // GitHub avatars are typically /u/<id> (optionally with query)
        pathname: '/u/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        // Tus URLs vienen de jsDelivr GitHub CDN:
        // https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/...
        pathname: '/gh/**',
      },
      // If your API ever returns other hosts, add them here.
      // { protocol: 'https', hostname: 'your-other-host.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;

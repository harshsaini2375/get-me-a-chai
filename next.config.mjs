/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',

      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',

      },
      {
        protocol: 'https',
        hostname: 'th.bing.com',

      },
    ],
  },
}

export default nextConfig;
// avatars.githubusercontent.com
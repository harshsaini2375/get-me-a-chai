/** @type {import('next').NextConfig} */
const nextConfig = {
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
      ],
    },
  }

export default nextConfig;
// avatars.githubusercontent.com
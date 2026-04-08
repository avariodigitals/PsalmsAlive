import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.psalmsalive.com',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.psalmsalive.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
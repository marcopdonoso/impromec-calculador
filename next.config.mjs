/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'impromec-catalog-production.up.railway.app',
        pathname: '/uploads/***',
      },
    ],
  },
}

export default nextConfig

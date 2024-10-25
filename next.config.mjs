/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'impromec-catalog-production.up.railway.app',
        port: '1337',
        pathname: '/uploads/***',
      },
    ],
  },
}

export default nextConfig

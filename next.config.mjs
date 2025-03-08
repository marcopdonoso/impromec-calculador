/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/drc513m7f/image/upload/**',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        pathname: '/drc513m7f/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'impromec-catalog-production.up.railway.app',
        pathname: '/uploads/**',
      },
    ],
  },
}

export default nextConfig

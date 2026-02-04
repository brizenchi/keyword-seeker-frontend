/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development practices
  reactStrictMode: true,

  images: {
    // Enable Next.js image optimization for better performance
    unoptimized: false,
    // Add image formats for better compression
    formats: ['image/avif', 'image/webp'],
  },

  // Enable compression
  compress: true,

  // Optimize production builds (swcMinify is default in Next.js 13+)
  // experimental: {
  //   optimisticClientCache: true,
  // },
}

export default nextConfig

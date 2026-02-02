/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用 React Strict Mode（避免开发时双重渲染）
  reactStrictMode: false,

  images: {
    // Enable Next.js image optimization for better performance
    unoptimized: false,
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    // 警告：这将在构建时完全禁用 ESLint
    // 只在部署时使用，开发时请移除此配置
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 如果有 TypeScript 错误也继续构建
    ignoreBuildErrors: false,
  },
  images: {
    domains: [],
    unoptimized: true
  },
  // 输出配置
  output: 'standalone'
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Removido basePath e assetPrefix para permitir que o GitHub Actions gerencie automaticamente
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Para GitHub Pages, você pode precisar configurar o basePath
  // basePath: process.env.NODE_ENV === 'production' ? '/seu-repositorio' : '',
};

export default nextConfig;

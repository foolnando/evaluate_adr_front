import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configuração explícita para GitHub Pages
  basePath: '/evaluate_adr_front',
  assetPrefix: '/evaluate_adr_front/',
};

export default nextConfig;

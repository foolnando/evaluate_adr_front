import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Para GitHub Pages, configure o basePath com o nome do repositório
  basePath: process.env.NODE_ENV === 'production' ? '/evaluate_adr_front' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/evaluate_adr_front/' : '',
};

export default nextConfig;

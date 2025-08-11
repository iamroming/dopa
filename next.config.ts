import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['your-package-name'],
    eslint: {
    ignoreDuringBuilds: true,
  },
  
  },
}
export default nextConfig;

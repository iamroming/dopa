import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  experimental: {
    serverComponentsExternalPackages: ['your-package-name'],
    eslint: {
    ignoreDuringBuilds: true,
     eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverExternalPackages: ['@supabase/supabase-js'],
  },
  },
  
  },
}
export default nextConfig;

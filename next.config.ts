import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
 
  images: {
    domains: ["localhost", "127.0.0.1"],
    unoptimized: true,
  },

  experimental: {
    optimizeCss: false,
  },

  webpack: (config: any, { isServer }) => {
    config.optimization.minimize = false;
    return config;
  },

  async rewrites() {
    return [];
  },
};

export default nextConfig;

// const nextConfig = {
//   reactStrictMode: false,

//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     domains: ["localhost"],
//     unoptimized: true,
//   },
//   async rewrites() {
//     return [
//       // { source: "/signup", destination: "/auth/signup" },
//       // { source: "/login", destination: "/auth/login" },
//       // { source: "/verification", destination: "/auth/otp-verification" },
//     ];
//   },
// };

// export default nextConfig;

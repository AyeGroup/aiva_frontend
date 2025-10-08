 

const nextConfig = {
  reactStrictMode: false,

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      // { source: "/signup", destination: "/auth/signup" },
      // { source: "/login", destination: "/auth/login" },
      // { source: "/verification", destination: "/auth/otp-verification" },
    ];
  },
};

export default nextConfig;

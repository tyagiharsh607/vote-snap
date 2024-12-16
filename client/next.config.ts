import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        protocol: "http",
      },

      // for the deployed site
      {
        hostname: "vote-snap.vercel.app",
        protocol: "https",
      },
      {
        hostname: "vote-snap-backend.onrender.com",
        protocol: "https",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;

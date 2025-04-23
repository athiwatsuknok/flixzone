import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["image.tmdb.org"],
  },
  swcMinify: true,
  compress: true,
  middleware: true,
};

export default nextConfig;

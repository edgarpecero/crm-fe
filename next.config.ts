import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false, 
  },
  reactStrictMode: false,
};

export default nextConfig;

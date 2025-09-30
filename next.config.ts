import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "/**",
        port: "1338",
        protocol: "http",
        search: "",
      },
      {
        hostname: "sztrab.zettara.com",
        pathname: "/**",
        port: "",
        protocol: "https",
        search: "",
      },
    ],
  },
};

export default nextConfig;

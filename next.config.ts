import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "/**",
        port: "1337",
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

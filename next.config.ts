import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
        pathname: "/**",
        port: "1337",
        protocol: "http",
        search: "",
      },
      {
        hostname: "strapi.zettara.com",
        pathname: "/**",
        port: "",
        protocol: "https",
        search: "",
      },
    ],
  },
};

export default nextConfig;

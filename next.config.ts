import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./meals.db"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mehul-nextjs-foodie-app.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

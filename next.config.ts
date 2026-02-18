import type { NextConfig } from "next";

// next.config.js
import { config } from "dotenv";

if (process.env.NODE_ENV === "production") {
  config({
    path: ".env.production"
  });
} else {
  config({
    path: ".env.development"
  });
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

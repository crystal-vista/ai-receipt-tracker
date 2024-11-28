require('dotenv').config({ path: '.env.local' });
module.exports = {
  env: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   serverActions: true
  // },
};

export default nextConfig;

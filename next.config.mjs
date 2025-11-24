import { withNextVideo } from "next-video/process";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    turbo: {
      enabled: false, // turn off Turbopack completely
    },
  },
};

export default withNextVideo(nextConfig);

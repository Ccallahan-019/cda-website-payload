import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cda-website-payload.vercel.app',
        port: '',
        pathname: '/api/**',
        search: '?undefined',
      },
      {
        protocol: 'https',
        hostname: 'cda-pa.org',
        port: '',
        pathname: '/api/**',
        search: '?undefined',
      },
    ],
  },
};

export default withPayload(nextConfig);

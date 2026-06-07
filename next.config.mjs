import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: repoRoot,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.getstratiq.co" }],
        destination: "https://getstratiq.co/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;

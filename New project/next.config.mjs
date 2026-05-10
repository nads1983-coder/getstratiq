/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: [],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.getstratiq.co",
          },
        ],
        destination: "https://getstratiq.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

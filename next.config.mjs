/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.leadwithnadine.com" }],
        destination: "https://leadwithnadine.com/:path*",
        permanent: true,
      },
    ];
  },
};
export default nextConfig;

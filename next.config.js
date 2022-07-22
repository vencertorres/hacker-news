/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/top/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

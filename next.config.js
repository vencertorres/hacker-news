/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/news/1",
      },
      {
        source: "/:stories(news|newest|ask|show|jobs)",
        destination: "/:stories/1",
      },
    ];
  },
};

module.exports = nextConfig;

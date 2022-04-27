/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/fs/:doc*',
        destination: 'https://fs.smrth.dev/smrth/global/:doc*',
      },
    ]
  },
}

module.exports = nextConfig

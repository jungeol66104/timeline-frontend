/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.timeline.vg',
        port: '',
      },
    ],
  },
}
module.exports = nextConfig

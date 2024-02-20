/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'timeline-image.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
  },
}
module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_BACKEND_HOSTNAME],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_BACKEND_HOSTNAME, "api.dicebear.com"],
  },
};

module.exports = nextConfig;

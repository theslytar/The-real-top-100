/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.futbin.com"],   // ← change or add domains if your image URLs use another host
  },
};

module.exports = nextConfig;

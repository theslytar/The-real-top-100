/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ⬇️ allow external images from Futbin & FlagCDN
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.futbin.com' },
      { protocol: 'https', hostname: 'flagcdn.com' }
    ]
  }
};

module.exports = nextConfig;

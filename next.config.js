/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co'],
  },
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    config.resolve.alias = {
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;


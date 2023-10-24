/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["m.media-amazon.com", "res.cloudinary.com", "t4.ftcdn.net"],
  },
};

module.exports = nextConfig;

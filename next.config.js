/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    serverActions:true
  },
  images: {
    domains: ['m.media-amazon.com','res.cloudinary.com'],
  },
};

module.exports = nextConfig;




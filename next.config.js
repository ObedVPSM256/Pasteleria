/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'peopleenespanol.com',
      'images.unsplash.com',
      'img.freepik.com',
      'www.example.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dulcesdelicias',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 
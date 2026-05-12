/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.huego.resumatch.co.in/:path*',
      },
    ];
  },
};

export default nextConfig;

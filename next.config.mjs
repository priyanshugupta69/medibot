/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://medocgpt.duckdns.org/:path*',
      },
    ];
  },
};

export default nextConfig;

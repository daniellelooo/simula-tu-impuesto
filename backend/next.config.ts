/** @type {import('next').NextConfig} */
const nextConfig = {
  // Backend solo para API - Sin páginas ni UI
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // CORS para permitir peticiones del frontend
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

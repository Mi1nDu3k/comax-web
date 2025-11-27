/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co', // Cho phép ảnh mock
      },
      {
        protocol: 'https',
        hostname: 'localhost',    // Cho phép ảnh từ Backend .NET tương lai
      },
    ],
    dangerouslyAllowSVG: true,    // Fix lỗi ảnh SVG từ placehold.co
  },
};

export default nextConfig;
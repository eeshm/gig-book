/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    // Serve modern image formats (AVIF first, then WebP)
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 1 hour on the CDN / browser
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    // Tree-shake large icon / animation packages at compile time
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;

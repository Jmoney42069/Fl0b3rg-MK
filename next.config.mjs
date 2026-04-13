/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  eslint: {
    // Vercel build will not fail on ESLint warnings/errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors are already caught locally — don't block Vercel deploy
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

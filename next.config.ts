import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/:path*",
        destination: "/uploads/:path*",
        permanent: true,
      },
      {
        source: "/product-category/rice/:path*",
        destination: "/our-products/rice/",
        permanent: true,
      },
      {
        source: "/product-category/sugar/:path*",
        destination: "/our-products/sugar/",
        permanent: true,
      },
      {
        source: "/product-category/fertilizer/:path*",
        destination: "/our-products/fertilizer/",
        permanent: true,
      },
      {
        source: "/product-category/refined-oils/:path*",
        destination: "/our-products/oils/",
        permanent: true,
      },
      {
        source: "/product-category/oils/:path*",
        destination: "/our-products/oils/",
        permanent: true,
      },
      {
        source: "/product-category/metals/:path*",
        destination: "/our-products/metals/",
        permanent: true,
      },
      {
        source: "/product-category/:path*",
        destination: "/our-products/",
        permanent: true,
      },
      {
        source: "/shop/:path*",
        destination: "/our-products/",
        permanent: true,
      },
      {
        source: "/blocks/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/featured_item/:path*",
        destination: "/our-products/",
        permanent: true,
      },
      {
        source: "/wp-admin/:path*",
        destination: "/",
        permanent: false,
      },
      {
        source: "/wp-content/:path*",
        has: [{ type: "header", key: "x-wp-redirect", value: "(.*)" }],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

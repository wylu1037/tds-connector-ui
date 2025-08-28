import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const baseUrl = process.env.TDSC_BASE_URL || 'http://172.22.0.23:8085';
    return [
      {
        source: '/zh/tdsc/:path*',
        destination: `${baseUrl}/:path*`,
      },
      {
        source: '/en/tdsc/:path*',
        destination: `${baseUrl}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

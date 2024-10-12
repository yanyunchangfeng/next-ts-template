import proxy from './proxy.mjs';
const mode = process.env.BUILD_MODE ?? 'standalone';
const { ENV } = process.env;
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_BUILD_PATH ?? undefined,
  output: mode,
  distDir: 'dist',
  reactStrictMode: false
};
const CorsHeaders = [
  { key: 'Access-Control-Allow-Credentials', value: 'true' },
  { key: 'Access-Control-Allow-Origin', value: '*' },
  {
    key: 'Access-Control-Allow-Methods',
    value: '*'
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: '*'
  },
  {
    key: 'Access-Control-Max-Age',
    value: '86400'
  }
];

if (mode !== 'export') {
  nextConfig.headers = async () => {
    return [
      {
        source: '/msService/:path*',
        headers: CorsHeaders
      }
    ];
  };

  nextConfig.rewrites = async () => {
    return {
      beforeFiles: proxy[ENV]
    };
  };
}

export default nextConfig;

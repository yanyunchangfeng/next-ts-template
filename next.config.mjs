import proxy from './proxy.mjs';
const mode = process.env.BUILD_MODE ?? undefined;
const { ENV } = process.env;
/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NEXT_PUBLIC_BUILD_PATH ?? undefined,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? undefined,
  output: mode,
  // productionBrowserSourceMaps: true,
  distDir: process.env.NEXT_PUBLIC_DIST_DIR ?? undefined,
  reactStrictMode: false,
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.thecatapi.com',
        port: '',
        pathname: '/images/**'
      }
    ]
  }
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

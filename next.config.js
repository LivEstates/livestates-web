/** @type {import('next').Config} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = 'livestates-web'; 

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : '',
  },
};

module.exports = nextConfig;

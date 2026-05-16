/** @type {import('next').Config} */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = 'livestates-web';
const basePath = isGithubPages ? `/${repoName}` : '';

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;

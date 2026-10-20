/** @type {import('next').Config} */
// Production has no basePath: the site is served at the root of
// livestates.tech, where the ops server's nginx reverse-proxies `/` to this
// repo's Pages URL (livestates.github.io/livestates-web/), so the bare
// github.io URL can't load assets on its own. PREVIEW_BASE_PATH is only for
// review builds hosted under a sub-path, e.g. /livestates-web-preview/copy.
const basePath = process.env.PREVIEW_BASE_PATH || '';

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

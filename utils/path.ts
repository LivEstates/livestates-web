export function getAssetPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

/** First-frame poster of a clip: `…/videos/<name>.mp4` → `…/videos/posters/<name>.webp`. */
export function getPosterPath(videoSrc: string) {
  return videoSrc.replace(/\/videos\/([^/]+)\.mp4$/, "/videos/posters/$1.webp");
}

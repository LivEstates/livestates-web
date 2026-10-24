export function getAssetPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

/** First-frame poster of a clip: `…/videos/<name>.mp4` → `…/videos/posters/<name>.webp`.
 *  Undefined for any other path, so a clip is never requested again as its
 *  own poster. */
export function getPosterPath(videoSrc: string) {
  const poster = videoSrc.replace(/\/videos\/([^/]+)\.mp4$/, "/videos/posters/$1.webp");
  return poster === videoSrc ? undefined : poster;
}

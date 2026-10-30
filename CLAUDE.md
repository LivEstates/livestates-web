# livestates-web

## Role

You are a **Senior Frontend Engineer** responsible for the LivEstates marketing and landing site. You own the public web presence that forms many users' first impression of the platform.

- **First impression matters**: Every page must load fast, look polished, and clearly communicate the value of LivEstates to buyers and agents.
- **Brand consistency**: Follow the existing visual style, typography, motion language, and color palette. Changes to brand elements need explicit approval.
- **Static-first mindset**: This is a Next.js static export. No server-side rendering, API routes, middleware, or server-only features.
- **SEO and accessibility**: Use semantic HTML, proper heading hierarchy, useful metadata, accessible controls, and alt text where applicable.
- **Performance**: Optimize images and video assets, minimize JavaScript, and avoid unnecessary client-side dependencies.
- **Product accuracy**: Marketing copy should match the actual mobile app and product docs. Do not invent capabilities that are not supported.

## Overview

Marketing and landing web client for LivEstates. Built with Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, and Lenis. It showcases the LivEstates mobile app through video-centric hero sections, scroll-triggered animation, phone mockups, feature sections, FAQ, and call-to-action content.

See `../CLAUDE.md` for workspace-wide rules including git workflow, cross-repo coordination, and product docs sync.

## Tech Stack

- **Framework**: Next.js 14.2.5 App Router
- **Language**: TypeScript 5.6 with `strict` enabled
- **UI**: React 18.2
- **Styling**: Tailwind CSS 3.4 with class-based dark mode
- **Motion**: Framer Motion 11 and Lenis smooth scrolling
- **Package manager**: npm, with `package-lock.json` committed
- **Deployment**: GitHub Pages via `.github/workflows/nextjs.yml`, served at https://livestates.tech through the ops server's nginx

## Project Structure

```
app/
  layout.tsx                 # Root layout, metadata, theme provider, smooth scroll
  page.tsx                   # Main landing page composition
  globals.css                # Global Tailwind styles
components/
  Hero.tsx                   # Video carousel hero sections and the intro header bar
  BackgroundVideo.tsx        # Every background clip: load order, poster, play only while visible
  videoQueue.ts              # Holds deferred clips until the first hero clip is buffered
  heroPlaceholders.ts        # Inline blurred thumbnail painted before slide 1's poster arrives
  AnimatedTitle.tsx          # Scroll-triggered animated titles
  StickyFeatureGallery.tsx   # Sticky phone preview and feature steps
  Phone.tsx                  # Phone mockup frame and chat mockup
  HighlightSection.tsx       # Dual-phone highlight section
  FeatureGrid.tsx            # Product feature grid
  FAQ.tsx                    # FAQ accordion
  CTA.tsx                    # Call-to-action section
  Footer.tsx                 # Footer
  SmoothScroll.tsx           # Lenis smooth scroll wrapper
  ThemeProvider.tsx          # Theme context provider
utils/
  path.ts                    # getAssetPath / getPosterPath for public assets
public/
  policy/                    # Legal pages the mobile app links to (see Known Pitfalls)
  videos/                    # Marketing video assets
    posters/                 # First-frame poster for every clip on the page (<name>.webp)
```

## Build & Run Commands

```bash
npm install       # Local dependency install
npm ci            # CI-style install from package-lock.json
npm run dev       # Dev server on port 3000
npm run build     # Static export build
npm run lint      # Prompts for ESLint setup until a config is added
```

## Known Pitfalls

- **Static export**: `next.config.js` uses `output: 'export'`. Do not add API routes, middleware, `getServerSideProps`, or other server-only features.
- **GitHub Pages deployment**: The production deploy path is the GitHub Pages workflow, not Vercel. GitHub Actions runs Node 20, `npm ci`, `next build`, uploads `./out`, then deploys with `actions/deploy-pages`.
- **Domain routing**: `livestates.tech` belongs to nginx on the ops server, not to GitHub Pages. nginx reverse-proxies `/` to this repo's Pages URL (`https://livestates.github.io/livestates-web/`) and keeps `/api`, `/images/uploads`, `/videos/uploads` and `/password` for the backend and the app's uploaded media. So production builds have no `basePath`, and no public file may live under those paths. Never set a custom domain in this repo's Pages settings — github.io would 301 to livestates.tech and nginx would proxy it straight back, a redirect loop. The bare github.io URL doesn't load assets on its own; review on livestates.tech or with `npm run dev`.
- **Preview builds**: To host a review build under a sub-path, build with `PREVIEW_BASE_PATH=/<repo>/<dir> npm run build`. Next.js prefixes its own assets, but files from `public/` referenced in code must go through `getAssetPath` (`utils/path.ts`), or they 404 in previews.
- **Policy pages**: `public/policy/*.html` (terms, privacy policy, and the live-streaming rules for streamers and viewers) are standalone HTML, originally copied from the legacy `LivEstates.github.io` site. The mobile app opens these exact URLs, which the backend's `/api/misc/configs` returns, so never rename or move them, and treat their content as legal text, not marketing copy. The legal entity is Virtual Hybrid Inc. (doing business as LivEstates), as on the Apple developer account; the privacy policy said LLC until 2026-10-26.
- **Images**: `images.unoptimized` is enabled for static export. Do not rely on Next.js image optimization.
- **Video assets**: Keep video files compressed and purposeful. Large autoplay assets can hurt mobile load time quickly. Encode background loops as H.264 High, at most 1080p, CRF ~24, no audio track, index at the front:
  ```bash
  AIGC=$(ffprobe -v error -show_entries format_tags=AIGC -of default=nw=1:nk=1 in.mp4)
  ffmpeg -i in.mp4 -an -map_metadata -1 -metadata AIGC="$AIGC" \
    -vf "scale=-2:'min(1080,ih)':flags=lanczos:out_range=tv,format=yuv420p" \
    -c:v libx264 -preset slow -crf 24 -profile:v high \
    -colorspace bt709 -color_primaries bt709 -color_trc bt709 \
    -movflags +faststart+use_metadata_tags out.mp4
  ```
  - **Size**: the scale caps the height and never upscales. For portrait clips use `scale='min(1080,iw)':-2`. Picture-in-picture tiles only need 720p.
  - **Narrow cut**: `01-narrow.mp4` is the centre 720×1080 (2:3) of `01.mp4`, for phones held upright (see `eager` below). Whenever `01.mp4` changes, make it from the same source with the same command, adding `,crop=720:1080` at the end of `-vf`. That keeps it the exact middle of `01.mp4`, so it can share `01.webp` as its poster.
  - **AI provenance label**: AI-generated sources carry an `AIGC` label, the implicit label defined by China's GB 45438-2025 (`ffprobe -show_format` shows it); `02`–`04.mp4` have one. The first line and `-metadata AIGC` carry it over byte for byte, and `use_metadata_tags` is what makes the mp4 muxer write it. A source without the label gets none. Removing a label must be an explicit, recorded decision, never a side effect of an encode. All other metadata is dropped on purpose: `-map_metadata 0` would also publish a phone clip's GPS location, device model and capture date.
  - **Color**: the BT.709 flags keep the output tagged on any FFmpeg build (FFmpeg 7.0 dropped the matrix tag when it converted the full-range `02`/`03` sources). They assume an SDR source; tone-map HDR footage, such as iPhone HLG, first.
  - **Codec**: never ship HEVC/H.265 as the only source. Browsers decode it only where the device has a hardware decoder, so the clip renders blank everywhere else. H.264 plays everywhere.
- **Video loading order**: Every clip on the page goes through `BackgroundVideo`, never a raw `<video autoPlay>`: a `src` in the server HTML starts downloading while the page parses and takes bandwidth from the first slide. Pick the mode by where the clip sits:
  - `eager`: the intro's first slide only. It ships its video, poster and `autoplay` in the HTML. Viewports narrower than 2:3, such as phones held upright, get its narrow cut instead, which shows them the same picture in ~40% of the bytes. Both files go in the HTML as `<source media>`, so the browser picks one before any script runs; a script swap would come after the full frame had started downloading. If the viewport turns wide later, such as a phone turned sideways, the clip switches to the full frame.
  - `queued`: the intro's other slides and its picture-in-picture tiles. They wait in `videoQueue.ts` until slide 1 is fully buffered, the visitor first interacts, or 4 s pass, then load one at a time, playing hidden while they buffer (a paused clip buffers slowly, and iOS Safari doesn't buffer it at all). A queued clip that comes into view before its turn loads at once, except slide 1's tile (`firstScreen`): it is in view from the start, so it waits anyway, showing its poster from the HTML, and takes the queue's first slot.

    Their posters don't wait for the queue. They all load once slide 1 starts playing, or when the queue is released, if that comes first. So a visitor who scrolls ahead of the queue sees the slide's first frame. Without a poster, a slide shows only its `bg-black/45` scrim over the white section, which reads as a gray screen.
  - `near`: everything further down. It loads when it comes within one screen of the viewport. The posters of all these clips load together, earlier: as soon as the first of them starts loading, so a visitor heading down the page has them before the other videos down there split the link. A poster loaded only ahead of its own clip shared the link with the videos already loading, and on a fast scroll over a weak signal it arrived up to a second after its gray scrim was on screen.

  Every clip plays only while it is on screen and its layer is visible, and pauses otherwise. `minWidth` keeps the videos of CSS-hidden elements, such as the tiles below `md`, from loading. It can't stop a poster that is in the HTML: phones still fetch slide 1's tile poster (Firefox does, though the tile is hidden).
- **Posters**: every clip needs `public/videos/posters/<name>.webp`; a narrow cut uses its full frame's. It must be the clip's first frame at the clip's own size, which is what the command below makes, so the switch from poster to video is seamless. `getPosterPath` derives the poster path from the clip path. Decode with the explicit BT.709 matrix, or the colors jump when the video starts:
  ```bash
  ffmpeg -i in.mp4 -frames:v 1 -vf "scale=in_color_matrix=bt709:in_range=tv,format=rgb24" -c:v libwebp -quality 78 public/videos/posters/<name>.webp
  ```
  Posters carry no AIGC label. That was the site owner's decision on 2026-10-23.

  Slide 1 additionally gets an inline 32×18 blurred thumbnail (`heroPlaceholders.ts`), so the first paint shows the scene before the poster arrives. It is blurred because it is tiny: only an image of a few hundred bytes can ship inside the HTML for free. The other intro clips get no thumbnail. They show their real first frame, which usually arrives before a visitor scrolls to them. On a slow link (~4 Mbit/s), a visitor who scrolls within the first two seconds can still see slide 2's gray scrim for about a second. The site owner chose that over blurred thumbnails on 2026-10-28. Whenever `01.mp4` changes, remake all three assets made from it: its narrow cut (see **Narrow cut** above), its poster, and then this thumbnail, by pasting this command's output into `INTRO_SLIDE_1_PLACEHOLDER`:
  ```bash
  echo "data:image/webp;base64,$(ffmpeg -v error -i public/videos/posters/01.webp -vf scale=32:18 -c:v libwebp -quality 50 -f webp - | base64 -w0)"
  ```
- **ESLint**: `package.json` has a `lint` script, but no ESLint config is currently committed. Running `npm run lint` opens Next.js' initial setup prompt; do not add lint config as a drive-by change unless that is the requested scope.
- **Theme behavior**: Tailwind dark mode is class-based, and `ThemeProvider` currently initializes the site to light mode.
- **Frontend/docs sync**: If marketing copy, product behavior, or API-facing claims change, check whether `livestates-product-docs` needs a companion update.

## Git Workflow

All changes go through Pull Requests. Never push directly to `main`.

- Branch naming: `feature/xxx`, `fix/xxx`, or `chore/xxx`.
- If you are the **author** of a PR, do NOT merge it yourself. Leave it for review.
- If you are the **reviewer**, you may approve and merge after confirming correctness.

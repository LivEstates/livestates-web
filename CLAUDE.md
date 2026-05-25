# livestates-web

## Role

You are a **Frontend Engineer** owning the LivEstates marketing website. This is a public-facing storefront for the mobile app -- it must look professional, load fast, and clearly communicate what LivEstates does.

- **Brand consistency**: Follow the existing visual style, typography, motion language, and color palette. Changes to brand elements need explicit approval.
- **Performance**: This site is statically exported. Keep it lightweight, optimize video/image assets, and avoid unnecessary client-side dependencies.
- **Mobile-first**: Most visitors come from mobile. Design and test mobile layouts first, then verify desktop.
- **Product accuracy**: Marketing copy should match the actual mobile app and product docs. Do not invent capabilities that are not supported.

## Overview

Marketing website for LivEstates, built with Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Framer Motion, and Lenis. It showcases the LivEstates mobile app through video-centric hero sections, scroll-triggered animation, phone mockups, feature sections, FAQ, and call-to-action content.

See `../CLAUDE.md` for workspace-wide rules including git workflow, cross-repo coordination, and product docs sync.

## Project Structure

```
app/
  layout.tsx                 # Root layout, metadata, theme provider, smooth scroll
  page.tsx                   # Main landing page composition
  globals.css                # Global Tailwind styles
components/
  Header.tsx                 # Site header and navigation
  Hero.tsx                   # Video carousel hero sections
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
  path.ts                    # Asset path helper for GitHub Pages basePath
public/
  videos/                    # Marketing video assets
```

## Build & Run Commands

```bash
npm install
npm run dev       # Dev server on port 3000
npm run build     # Static export build
npm run lint      # Next.js lint
```

## Known Pitfalls

- **Static export**: `next.config.js` uses `output: 'export'`. Do not add API routes, middleware, `getServerSideProps`, or other server-only features.
- **GitHub Pages base path**: GitHub Actions sets `GITHUB_ACTIONS=true`, which enables `basePath` and `assetPrefix` for `/livestates-web`. Use `utils/path.ts` for public assets that need the deployment base path.
- **Images**: `images.unoptimized` is enabled for static export. Do not rely on Next.js image optimization.
- **Video assets**: Keep video files compressed and purposeful. Large autoplay assets can hurt mobile load time quickly.
- **Frontend/docs sync**: If marketing copy, product behavior, or API-facing claims change, check whether `livestates-product-docs` needs a companion update.

## Git Workflow

All changes go through Pull Requests. Never push directly to `main`.

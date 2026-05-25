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

## Tech Stack

- **Framework**: Next.js 14.2.5 App Router
- **Language**: TypeScript 5.6 with `strict` enabled
- **UI**: React 18.2
- **Styling**: Tailwind CSS 3.4 with class-based dark mode
- **Motion**: Framer Motion 11 and Lenis smooth scrolling
- **Package manager**: npm, with `package-lock.json` committed
- **Deployment**: GitHub Pages via `.github/workflows/nextjs.yml`

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
npm install       # Local dependency install
npm ci            # CI-style install from package-lock.json
npm run dev       # Dev server on port 3000
npm run build     # Static export build
npm run lint      # Prompts for ESLint setup until a config is added
```

## Known Pitfalls

- **Static export**: `next.config.js` uses `output: 'export'`. Do not add API routes, middleware, `getServerSideProps`, or other server-only features.
- **GitHub Pages deployment**: The production deploy path is the GitHub Pages workflow, not Vercel. GitHub Actions runs Node 20, `npm ci`, `next build`, uploads `./out`, then deploys with `actions/deploy-pages`.
- **GitHub Pages base path**: `next.config.js` checks `GITHUB_ACTIONS=true`, which enables `basePath` and `assetPrefix` for `/livestates-web`. Use `utils/path.ts` for public assets that need the deployment base path.
- **Images**: `images.unoptimized` is enabled for static export. Do not rely on Next.js image optimization.
- **Video assets**: Keep video files compressed and purposeful. Large autoplay assets can hurt mobile load time quickly.
- **ESLint**: `package.json` has a `lint` script, but no ESLint config is currently committed. Running `npm run lint` opens Next.js' initial setup prompt; do not add lint config as a drive-by change unless that is the requested scope.
- **Theme behavior**: Tailwind dark mode is class-based, and `ThemeProvider` currently initializes the site to light mode.
- **Frontend/docs sync**: If marketing copy, product behavior, or API-facing claims change, check whether `livestates-product-docs` needs a companion update.

## Git Workflow

All changes go through Pull Requests. Never push directly to `main`.

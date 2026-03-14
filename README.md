# LivEstates Marketing Website

Marketing website for **LivEstates** -- a real estate social platform that connects agents and users through live property showings. Built with Next.js, React, TypeScript, and Framer Motion.

## Overview

This site serves as the public-facing marketing page for the LivEstates mobile app. It showcases core product features through video-centric hero sections, scroll-triggered animations, and interactive component demos including a live chat mockup.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
- **Language:** TypeScript
- **UI:** React 18
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion 11
- **Smooth Scrolling:** Lenis
- **Utilities:** clsx

## Project Structure

```
app/
  layout.tsx          # Root layout with theme provider and smooth scroll
  page.tsx            # Main landing page
components/
  Header.tsx          # Site header / navigation
  Hero.tsx            # Video carousel hero sections
  AnimatedTitle.tsx   # Scroll-triggered animated titles
  StickyFeatureGallery.tsx  # Sticky phone preview + feature step sections
  Phone.tsx           # Phone mockup frame and MockChat component
  HighlightSection.tsx      # Dual-phone floating/tilted highlight
  FeatureGrid.tsx     # Grid layout of product features
  FAQ.tsx             # Accordion-style FAQ section
  CTA.tsx             # Call-to-action section
  Footer.tsx          # Site footer
  SmoothScroll.tsx    # Lenis smooth scroll wrapper
  ThemeProvider.tsx   # Theme context provider
utils/
  path.ts             # Asset path helper (getAssetPath)
public/
  videos/             # Marketing videos for hero and feature sections
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
pnpm build
pnpm start
```

## Deployment

Deploy to [Vercel](https://vercel.com/) for the best Next.js experience, or any platform that supports Node.js.

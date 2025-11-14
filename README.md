# Sticky – Framer Motion Clone

A React (Next.js) + Framer Motion project that recreates the *look & feel* of a Framer "Sticky mobile app showcase" page, including:

- Sticky preview phone on the left + step-by-step feature sections on the right
- Scroll-triggered transitions
- Floating/tilted dual-phone highlight
- Feature grid, FAQ accordion, and CTA sections

> **Note:** All copy and images are placeholders. Replace with your own content. The point is to match the **animations/structure** so you can swap assets to reproduce the exact design you own the rights for.

## Run locally

```bash
pnpm i # or npm install / yarn
pnpm dev # or npm run dev
```

Visit http://localhost:3000

## Customize

- Edit `components/StickyFeatureGallery.tsx` to change the steps (`FEATURES` array).
- Replace phone content by editing `components/Phone.tsx` (e.g. render screenshots inside `.screen`).
- Colors, shadows, and layout are Tailwind classes in `app/globals.css`.

## Deploy

- One-click deploy to Vercel or Netlify.
- Bind your custom domain (e.g., `yourname.com`) in the hosting platform.

# LivEstates Web Demo

This repository hosts the **official demo website** for **LivEstates**, showcasing the product concept, visual design, and interactive layout for the platform.

## 🌐 Live Website
The site is deployed via **GitHub Pages**:
👉 [https://livestates.github.io/livestates-web/](https://livestates.github.io/livestates-web/)

## 📁 Project Structure
- `index.html` – Vite entry point that loads the React application and shared styles.
- `src/` – TypeScript React source composed of reusable components, section modules, and typed content data.
  - `src/components/` – shared UI building blocks such as navigation, animated wrappers, and the footer.
  - `src/sections/` – page-level feature sections implemented as idiomatic React components.
  - `src/data/content.ts` – strongly typed copy and asset configuration that drives the interface.
- `public/assets/` – Static resources (images, videos, CSS, fonts).

## 🚀 Local Development
Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open the printed URL (defaults to `http://localhost:5173`).

## 🏗️ Production Build
Create an optimized production bundle:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run preview
```

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif','system-ui','Inter','-apple-system','Segoe UI','Roboto','Noto Sans','Ubuntu','Cantarell'],
        sans: ['ui-sans-serif','system-ui','Inter','-apple-system','Segoe UI','Roboto','Noto Sans','Ubuntu','Cantarell'],
        // The app's own UI stack, for the in-phone LivEstates AI chat replica.
        app: ['-apple-system','BlinkMacSystemFont','SF Pro Text','Segoe UI','Roboto','Helvetica Neue','Arial','sans-serif']
      },
      colors: {
        ink: "#0B0F15"
      },
      boxShadow: {
        'elev': '0 20px 40px rgba(0,0,0,0.15)'
      },
      borderRadius: {
        'phone': '36px',
        'screen': '28px'
      }
    },
  },
  plugins: [],
};

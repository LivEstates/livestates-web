/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['ui-sans-serif','system-ui','Inter','-apple-system','Segoe UI','Roboto','Noto Sans','Ubuntu','Cantarell'],
        sans: ['ui-sans-serif','system-ui','Inter','-apple-system','Segoe UI','Roboto','Noto Sans','Ubuntu','Cantarell']
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

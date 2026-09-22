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
        display: ['var(--font-display)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Jost', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: "#17140F",
        paper: "#F3EDE2",
        bone: "#E9E1D2",
        bronze: "#8E6B3E",
        olive: "#4A4A30",
        clay: "#A9553A",
      },
      boxShadow: {
        'elev': '0 30px 60px -30px rgba(52,38,20,0.35)'
      },
      borderRadius: {
        'phone': '44px',
        'screen': '34px'
      }
    },
  },
  plugins: [],
};

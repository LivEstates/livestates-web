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
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        ink: "#3B2A20",
        cream: "#FBF5EB",
        oat: "#F1E6D5",
        sand: "#E8D5BE",
        clay: "#C4673F",
        "clay-deep": "#9E4A2A",
        sage: "#A9B69A",
        "sage-soft": "#DDE3D0",
        "sage-deep": "#56654D",
        walnut: "#6B4A34",
        ochre: "#D9A55B",
      },
      boxShadow: {
        'elev': '0 20px 40px rgba(0,0,0,0.15)',
        'soft': '0 1px 2px rgba(91,58,36,0.06), 0 12px 32px -12px rgba(91,58,36,0.22)',
        'lift': '0 2px 4px rgba(91,58,36,0.08), 0 24px 48px -16px rgba(91,58,36,0.32)',
        'warm': '0 30px 80px -24px rgba(107,58,30,0.45)',
      },
      borderRadius: {
        'phone': '36px',
        'screen': '28px',
        'blob': '48px',
      }
    },
  },
  plugins: [],
};

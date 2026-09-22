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
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: "#05090C",
        abyss: "#070D12",
        signal: {
          DEFAULT: "#3DF5C8",
          soft: "#9DFBE3",
          deep: "#0FB98F",
        },
        onair: "#FF3B4E",
      },
      boxShadow: {
        'elev': '0 20px 40px rgba(0,0,0,0.35)',
        'glow': '0 0 0 1px rgba(61,245,200,0.35), 0 0 24px rgba(61,245,200,0.25)',
      },
      borderRadius: {
        'phone': '36px',
        'screen': '28px'
      }
    },
  },
  plugins: [],
};

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
        display: ['var(--font-display)', 'Impact', 'Haettenschweiler', 'Arial Narrow Bold', 'sans-serif'],
        sans: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: "#0A0A0A",
        lime: "#D4FF3A",
        navy: "#0B1F5C",
        tomato: "#FF4F2E",
        cream: "#FFF6E3"
      },
      boxShadow: {
        'elev': '0 20px 40px rgba(0,0,0,0.15)',
        'hard-sm': '3px 3px 0 0 #0A0A0A',
        'hard': '6px 6px 0 0 #0A0A0A',
        'hard-lg': '10px 10px 0 0 #0A0A0A',
        'hard-lime': '8px 8px 0 0 #D4FF3A',
        'hard-tomato': '8px 8px 0 0 #FF4F2E'
      },
      borderRadius: {
        'phone': '36px',
        'screen': '28px'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'marquee-slow': 'marquee 44s linear infinite'
      }
    },
  },
  plugins: [],
};

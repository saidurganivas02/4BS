/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0b132b',
          navy: '#1c2541',
          teal: '#3a506b',
          cyan: '#5bc0be',
          light: '#f8fafc',
          gold: '#f59e0b',
        },
        tata: {
          primary: '#0a369d',
          accent: '#c9184a',
          light: '#eff6ff',
          dark: '#061d54',
        },
        herbalife: {
          primary: '#16a34a',
          lime: '#65a30d',
          light: '#f0fdf4',
          dark: '#14532d',
        },
        kangen: {
          primary: '#0284c7',
          cyan: '#06b6d4',
          light: '#f0f9ff',
          dark: '#0369a1',
        },
        solar: {
          primary: '#ea580c',
          amber: '#f59e0b',
          light: '#fff7ed',
          dark: '#9a3412',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-tata': '0 0 25px -5px rgba(10, 54, 157, 0.3)',
        'glow-herbalife': '0 0 25px -5px rgba(22, 163, 74, 0.3)',
        'glow-kangen': '0 0 25px -5px rgba(2, 132, 199, 0.3)',
        'glow-solar': '0 0 25px -5px rgba(234, 88, 12, 0.3)',
      }
    },
  },
  plugins: [],
}

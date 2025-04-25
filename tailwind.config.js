/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e3e2ff',
          200: '#cbc9ff',
          300: '#aca3ff',
          400: '#9181ff',
          500: '#7a5af8',
          600: '#6b3eeb',
          700: '#5D5FEF',
          800: '#4826b4',
          900: '#3e2092',
          950: '#251261',
        },
        dark: {
          900: '#1A1C25',
          800: '#27293a',
          700: '#2E3047',
        }
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#dde6ff',
          500: '#4f6ef7',
          600: '#3a56e8',
          700: '#2d44cc',
        },
        surface: '#0f1117',
        card: '#1a1d27',
        border: '#2a2d3d',
      },
    },
  },
  plugins: [],
};

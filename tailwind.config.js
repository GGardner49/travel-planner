/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#1e3a5f', light: '#2d5282', dark: '#152742' },
        gold:  { DEFAULT: '#c9973a', light: '#e8b86d', pale: '#fef9ed' },
        sage:  { DEFAULT: '#7a9e7e', light: '#a3c4a8', pale: '#f0f7f1' },
        sky:   { DEFAULT: '#5b9bd5', light: '#89bceb', pale: '#eff6ff' },
        rose:  { DEFAULT: '#c26b7a', light: '#de97a3', pale: '#fdf2f4' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

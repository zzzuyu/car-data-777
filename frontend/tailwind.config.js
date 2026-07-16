import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kanit', 'sans-serif'],
      },
      colors: {
        primaryBrand: '#2563eb', // Blue-600
        primaryHover: '#1d4ed8', // Blue-700
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["dark"], 
  },
}

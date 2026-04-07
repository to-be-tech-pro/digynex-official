/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'professional-blue': {
          DEFAULT: '#0a192f', // Midnight
          light: '#1e3a8a',    // Royal
          lighter: '#3b82f6',
        },
        'luxe-white': '#f8fafc',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}


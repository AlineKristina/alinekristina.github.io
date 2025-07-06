/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ro-red': '#DC2626',
        'ro-gold': '#F59E0B',
      }
    },
  },
  plugins: [],
}

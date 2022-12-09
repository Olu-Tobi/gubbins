/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': {'max': '600px'},
      // => @media (min-width: 600px) { ... }

     

    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

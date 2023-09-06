/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors:{
        primary : "#F53850",
      }
    },
  },
  plugins: [],
}


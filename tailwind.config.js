// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily : {
        sans: ['"Helvetica Neue "', 'sans-serif'],
      }
    },
  },
  plugins: [],
};

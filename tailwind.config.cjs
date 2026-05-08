/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
    './public/slide1.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'text-left',
    'text-center',
    'text-right',
    // add other classes you generate dynamically here
  ],
};

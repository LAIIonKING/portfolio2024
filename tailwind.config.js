/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // React 파일을 스캔
  ],
  theme: {
    fontFamily: {
      dm: ['DM Serif Text'],
      inter: ['Inter'],
      nanum: ['Nanum Myeongjo'],
      oi: ['Oi'],
    },
    extend: {
      colors: {
        'main-blue': '#3e4cf0',
        'sub-blue': '#008aff',
        'main-green': '#54df8a',
        'main-orange': '#ff3f3f',
      },
    },
  },
  plugins: [],
};

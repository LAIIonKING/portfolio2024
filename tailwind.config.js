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
    },
    extend: {},
  },
  plugins: [],
};

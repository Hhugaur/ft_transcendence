/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        17: '4.25rem',
        70: '17.5rem',
      },
      colors: {
        bg0: 'hsl(22, 40.50%, 85.50%)',
        bg1: '#273B3A',
        bg11: '#36514F',
        bg2: '#732D24',
        bg21: '#9F3F32',
        txt0: '#186974',
        txt1: '#BE4334',
      },
      fontFamily: {
        bitcount: ['Bitcount', 'sans-serif'],
        caveat: ['Caveat Brush', 'cursive'],
      },
    },
  },
  plugins: [],
};

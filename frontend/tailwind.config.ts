/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", './src/html/**/*.html'],
  theme: {
    extend: {
      spacing: {
        15: '3.75rem',
        17: '4.25rem',
		30: '7.5rem',
		50: '12.5rem', 
		60: '15rem', 
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        white:'#ffffff',
        light:'#f2f2f2',
        gray:'#d6d6d6',
        primary:'#7290FF',
        dark:"#1e2029"
      },
      boxShadow:{
        '3xl':'2px 2px 30px rgba(114,144,255,0.3)'
      }
    },
  },
  plugins: [],
}
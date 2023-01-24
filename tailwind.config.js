/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        play: ["Play", "sans-serif"],
      },
      animation: {
        'shake': 'shake 1s cubic-bezier(.36, .07, .19, .97)'
      },
      keyframes: {
        'shake': {
          '10%, 90%': {
            transform: 'translate3d(-1px,0,0)'
          },
          '20%, 80%': {
            transform: 'translate3d(2px,0,0)'
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-4px,0,0)'
          },
          '40%, 60%': {
            transform: "translate3d(4px,0,0)"
          },
        }
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("prettier-plugin-tailwindcss"),
  ],
};

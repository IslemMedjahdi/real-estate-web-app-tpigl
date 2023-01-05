/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#1C3988",
          light: "#F3F3FA",
          hover: "#6E8AE9",
          dark: "#091638",
        },
      },
      fontFamily: {
        sans: ["'Open Sans'", "sans-serif"],
        serif: ["'Merriweather'", "serif"],
      },
      fontSize: {
        base: "0.9375rem",
      },
      animation: {
        reveal: "reveal forwards 0.7s ease-in-out",
      },
      keyframes: {
        reveal: {
          "0%": { transform: "scale(0,100%)" },
          "100%": { transform: "scale(100%,100%)" },
        },
      },
    },
  },
  plugins: [],
};

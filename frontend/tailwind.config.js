/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        spinAndScale: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.5) rotate(180deg)" },
          "100%": { transform: "scale(1) rotate(360deg)" },
        },
      },
      animation: {
        spinAndScale: "spinAndScale 4s linear infinite",
      },
      colors: {
        primary: "#3498db",
        secondary: "#2ecc71",
      },
    },
  },
  plugins: [],
};
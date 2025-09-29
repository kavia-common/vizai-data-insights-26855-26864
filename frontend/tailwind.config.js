/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        secondary: "#10B981",
        surface: "#F8FAFC",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0,0,0,0.06)"
      }
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ["Exo", "sans-serif", "cursive", "ui-monospace", "monospace"],
        inder: ["Inder", "sans-serif", "cursive", "ui-monospace", "monospace"],
        inter: ["Inter", "sans-serif", "cursive", "ui-monospace", "monospace"],
      },
      colors: {
        secondary: "#6933D5",
        cGrey: "#39393A",
        cGreyLit: "#666666",
        cWhiteMix: "#F4F5F6",
      },
    },
  },
  plugins: [],
};

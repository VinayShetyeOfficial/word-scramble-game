/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "bonus-fade": {
          "0%": {
            opacity: "0",
            transform: "translate(-50%, -100%)",
          },
          "20%": {
            opacity: "1",
            transform: "translate(-50%, 0)",
          },
          "80%": {
            opacity: "1",
            transform: "translate(-50%, 0)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -20%)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "bonus-fade": "bonus-fade 2s ease-in-out forwards",
        "fade-in": "fade-in 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

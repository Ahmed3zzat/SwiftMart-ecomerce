/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-color": {
          500: "#0aad0a",
          800: "rgb(38, 133, 38);",
        },
      },
      fontFamily: {
        fontBody: ["Cairo"],
        fontBar: ["Noto Sans Display"],
      },
    },
  },
  plugins: [],
};

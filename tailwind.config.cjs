/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primarycolor: {
          200: "#e9f5fe",
          300: "#d3ebfd",
          400: "#50AFFA",
          500: "#2199F7",
        },
      },
    },
  },
  plugins: [],
};

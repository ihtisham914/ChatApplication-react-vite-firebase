/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primarycolor: {
          300: "#E1F1FE",
          400: "#50AFFA",
          500: "#2199F7",
        },
      },
    },
  },
  plugins: [],
};

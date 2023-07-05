/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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

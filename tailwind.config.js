/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        // hero: "url('./assets/eduA.jpg')",
        // edu: "url('./assets/edulogo.png')",
        width: {
          15: "3.8rem",
        },
        colors: {
          blue: "#2980b9",
        },
      },
      fontFamily:{
        montserrat:["'Montserrat'", 'sans-serif;']
      }
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @types {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(accordion|button|image|input|modal|navbar|divider|ripple|spinner|form).js"
],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};
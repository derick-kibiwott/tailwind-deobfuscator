/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,tsx,ts,js,jsx}",
    "!./build/**/*",
    "!./assets/**/*",
    "!./.plasmo/**/*",
    "!./.github/**/*",
    "!./node_modules/**/*"
  ],
  theme: {
    extend: {}
  },
  plugins: []
}

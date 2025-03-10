/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        mainBg: '#121215',
        altBg: '#1E1E22',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 2s linear infinite'
      }
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ]
}

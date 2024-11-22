/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Asegúrate de que Tailwind escanee tus archivos
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#ffffff',
      'verdeob': '#8FB339',
      'verdeclaro': '#DFF0C2',
      'pielos': '#F1D5BB',
      'fondo': '#FFF2D8',
      'negropaco': '#333333',
    }
  },
  plugins: [],
}


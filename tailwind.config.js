/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        lasa: {
          100: '#F0F3FA',
          200: '#D5DEEF',
          300: '#B1C9EF',
          400: '#8AAEE0',
          500: '#638ECB',
          600: '#395886',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

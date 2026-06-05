/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        lightGreen: '#A5D6A7',
        accent: '#FF9800',
        dark: '#263238',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(38, 50, 56, 0.12)',
      },
    },
  },
  plugins: [],
};

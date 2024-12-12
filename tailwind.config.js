/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { // colors 객체를 사용해 색상을 확장
        primary: '#4db6ac',
        secondary: '#81d4fa',
        background: '#f5f5f5',
        text: '#333333',
        darkBackground: '#1e1e1e',
        darkText: '#ffffff',
      },
    },
  },
  plugins: [],
};
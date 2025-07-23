/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'tel': { min: '200px', max: '639px' },
      'sm': { min: '640px', max: '767px' },
      'md': { min: '768px', max: '1023px' },
      'lg': { min: '1024px', max: '1279px' },
      'xl': { min: '1280px', max: '1535px' },
      '2xl': { min: '1536px' },
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
  }

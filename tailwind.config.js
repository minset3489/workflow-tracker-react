/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      filter: {
        'invert-25': 'invert(25%)',
        'invert-40': 'invert(40%)',
        'invert-100': 'invert(100%)',
      },

      fontFamily: {
        body: ['Poppins','sans-serif']
      },
      
      colors: {
        'heading': '#444',
        'text':'#999',
        'primary':'#8d69f1',
        'highlight':'#d13267',
        'bg':'#f4f4f4'
        },
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    backdropFilter: {
      'none': 'none',
      'blur': 'blur(20px)',
    },
    
    extend: {},
  },
  plugins: [],
  variants:{
    extend:{
      display:["focus-group"]
    }
  }
}


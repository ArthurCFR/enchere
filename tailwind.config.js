/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-pink': '#FF6EC7',
        'neo-blue': '#00D9FF',
        'neo-yellow': '#FFEB3B',
        'neo-green': '#00FF88',
        'neo-purple': '#B794F6',
        'neo-black': '#000000',
        'neo-white': '#FFFFFF',
      },
      fontFamily: {
        'neo': ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brutal': '8px 8px 0px 0px rgba(0,0,0,1)',
        'brutal-sm': '4px 4px 0px 0px rgba(0,0,0,1)',
        'brutal-lg': '12px 12px 0px 0px rgba(0,0,0,1)',
      }
    },
  },
  plugins: [],
}

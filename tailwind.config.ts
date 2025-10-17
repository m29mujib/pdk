import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // semua file vue/ts akan dipindai
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d47a1',
        secondary: '#1565c0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rag-red': '#EF4444',
        'rag-amber': '#F59E0B',
        'rag-green': '#10B981',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-red-500',
    'bg-amber-500',
    'bg-green-500',
  ]
};
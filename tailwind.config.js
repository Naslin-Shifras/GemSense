/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#7C3AED',
          'purple-light': '#9F67FF',
          'purple-dark': '#5B21B6',
          bg: '#0D0D1B',
          'bg-card': '#13131F',
          'bg-input': '#1A1A2E',
          border: '#2A2A3F',
          'border-light': '#3A3A55',
          text: '#E8E8F0',
          muted: '#8888AA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'purple-glow': 'radial-gradient(ellipse at center, rgba(124,58,237,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'purple': '0 0 30px rgba(124,58,237,0.3)',
        'purple-sm': '0 0 15px rgba(124,58,237,0.2)',
      }
    },
  },
  plugins: [],
}

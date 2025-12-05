/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#191919',
          light: '#f5f5f5',
        },
        accent: {
          yellow: '#fac036',
          green: '#4CAF50',
          red: '#f44336',
        },
      },
      animation: {
        'fade-zoom-in': 'fadeZoomIn 0.5s ease',
        'bounce-in': 'bounceIn 0.6s ease',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeZoomIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3) translateY(-50px)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(250, 192, 54, 0.5)' },
          '50%': { boxShadow: '0 0 30px rgba(250, 192, 54, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}


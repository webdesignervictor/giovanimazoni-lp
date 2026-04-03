/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:     '#0a0a0a',
        surface: { DEFAULT: '#111111', 2: '#1a1a1a' },
        gold:    {
          DEFAULT: '#C4622D',
          dim:     'rgba(196,98,45,0.15)',
          glow:    'rgba(196,98,45,0.30)',
        },
        cream:   '#f2ede6',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      maxWidth: { container: '1200px' },
      animation: {
        'wa-pulse': 'waPulse 2s ease-out infinite',
      },
      keyframes: {
        waPulse: {
          '0%':   { transform: 'scale(1)',   opacity: '0.7' },
          '70%':  { transform: 'scale(1.5)', opacity: '0'   },
          '100%': { transform: 'scale(1.5)', opacity: '0'   },
        },
      },
    },
  },
}

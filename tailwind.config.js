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
          DEFAULT: '#c9a84c',
          dim:     'rgba(201,168,76,0.15)',
          glow:    'rgba(201,168,76,0.30)',
        },
        cream:   '#f5f5f0',
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body:    ['Inter',  'system-ui', 'sans-serif'],
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

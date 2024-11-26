/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFD1DC',
          blue: '#AEC6CF',
          yellow: '#FDFD96',
          purple: '#E6E6FA',
          green: '#98FF98'
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: '#1a1a1a',
              padding: '0.25rem',
              borderRadius: '0.25rem',
              color: '#e2e2e2',
            },
          },
        },
      },
    },
  },
  plugins: [],
};
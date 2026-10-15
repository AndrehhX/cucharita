/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: '#F9F3E9',
        cremaDark: '#F1E7D3',
        coral: {
          DEFAULT: '#EF705D',
          dark: '#D95A45',
          light: '#FF8A75',
          soft: '#FDE7E1',
        },
        cielo: {
          DEFAULT: '#7CA9D6',
          dark: '#5E8FC0',
          soft: '#E2EEF9',
        },
        miel: {
          DEFAULT: '#E9B85D',
          dark: '#D1A04A',
          soft: '#FDF0D5',
        },
        carbon: {
          DEFAULT: '#292B35',
          soft: '#5A5E72',
          muted: '#9AA0B4',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Nunito"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.4rem',
        xl3: '1.8rem',
        xl4: '2.2rem',
      },
      boxShadow: {
        card: '0 8px 24px -8px rgba(41,43,53,0.18)',
        pop: '0 12px 32px -10px rgba(239,112,93,0.45)',
        soft: '0 4px 16px -4px rgba(41,43,53,0.12)',
      },
    },
  },
  plugins: [],
};

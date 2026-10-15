/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: '#F9F3E9',
        cremaDark: '#EFE2CC',
        coral: {
          DEFAULT: '#EF705D',
          dark: '#D65440',
          deep: '#C14A36',
          light: '#FF9A86',
          soft: '#FDE5DE',
          mist: '#FFF1EC',
        },
        cielo: {
          DEFAULT: '#7CA9D6',
          dark: '#5B8CBE',
          soft: '#E1EDF9',
          mist: '#F0F7FD',
        },
        miel: {
          DEFAULT: '#E9B85D',
          dark: '#C9983F',
          soft: '#FCEDCB',
          mist: '#FDF6E3',
        },
        carbon: {
          DEFAULT: '#292B35',
          soft: '#5C6072',
          muted: '#9AA0B4',
          faint: '#E4E2D9',
        },
      },
      fontFamily: {
        display: ['"Baloo 2"', '"Nunito"', 'system-ui', 'sans-serif'],
        sans: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.4rem',
        xl3: '1.8rem',
        xl4: '2.4rem',
      },
      boxShadow: {
        card: '0 10px 28px -12px rgba(41,43,53,0.22)',
        pop: '0 14px 30px -10px rgba(239,112,93,0.5)',
        soft: '0 4px 14px -6px rgba(41,43,53,0.14)',
        hero: '0 18px 40px -18px rgba(239,112,93,0.45)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        pop: 'pop .18s ease-out',
      },
    },
  },
  plugins: [],
};

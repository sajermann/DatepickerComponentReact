/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.tsx', './src/**/*.ts', '**.html'],

  theme: {
    extend: {
      colors: {
        brand: {
          300: '#996DFF',
          500: '#8257e6',
        },
        primary: {
          100: '#b4daff',
          300: '#0068E2',
          500: '#0054B6',
          700: '#476fe6',
        },
        secondary: {
          100: '#FDB713',
          500: '#F5821F',
          700: '#F05A22',
          900: '#EF402F',
        },
        info: {
          500: '#E2E3E5',
          700: '#41464B',
        },
        success: {
          500: '#D1E7DD',
          700: '#0F5132',
        },
        error: {
          500: '#F8D7DA',
          600: '#BF2E3A',
          700: '#842029',
        },
        warning: {
          500: '#FFF3CD',
          700: '#664D03',
        },
        dark: {
          400: '#18181b',
          500: '#09090b',
          600: '#1f2937',
          700: '#0f1926',
        },
        odd: {
          500: '#F2F2F2',
        },
      },
      screens: {
        xm: '400px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1366px',
        '3xl': '1536px',
        '4xl': '1920px',
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        overlayClose: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
        contentClose: {
          from: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
        },
        enter: {
          '0%': { transform: 'scale(0.9)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        leave: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.9)', opacity: 0 },
        },
      },
      animation: {
        overlayShow: 'overlayShow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        overlayClose: 'overlayClose 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentClose: 'contentClose 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        enter: 'enter 200ms ease-out',
        leave: 'leave 150ms ease-in forwards',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('tailwindcss-animate'),
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};

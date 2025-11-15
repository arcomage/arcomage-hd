import forms from '@tailwindcss/forms'
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx,js,jsx,scss,sass,css}', './src/index.html'],
  theme: {
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.9)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.30)',
      none: 'none',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        darkborder: 'rgba(31, 41, 55, 0.65)',
        lightborder: 'rgba(243, 244, 246, 0.65)',
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
      transitionProperty: {
        'text-shadow': 'text-shadow',
      },
    },
  },

  plugins: [
    forms,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgb(0 0 0 / 50%)',
        },
        '.text-shadow-md': {
          'text-shadow':
            '0 4px 8px rgb(0 0 0 / 60%), 0 2px 4px rgb(0 0 0 / 40%)',
        },
        '.text-shadow-lg': {
          'text-shadow':
            '0 15px 30px rgb(0 0 0 / 55%), 0 5px 15px rgb(0 0 0 / 40%)',
        },
        '.text-shadow-stroke': {
          'text-shadow':
            '1px 1px 0 black, -1px 1px 0 black, -1px -1px 0 black, 1px -1px 0 black',
        },
        '.text-shadow-md-white': {
          'text-shadow':
            '0 4px 8px rgb(255 255 255 / 60%), 0 2px 4px rgb(255 255 255 / 40%)',
        },
        '.text-shadow-none': {
          'text-shadow': 'none',
        },
        // .text-shadow-white {
        //   text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
        // }
        // .text-shadow-lg-white {
        //   text-shadow: 0 15px 30px rgba(255, 255, 255, 0.55),
        //     0 5px 15px rgba(255, 255, 255, 0.4);
        // }
      })
    }),
  ],
}

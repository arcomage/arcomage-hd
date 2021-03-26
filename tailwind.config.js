const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette')
  .default
const forms = require('@tailwindcss/forms')

module.exports = {
  purge: ['./src/**/*.{ts,tsx,js,jsx,scss,sass,css}', './src/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      darkborder: 'rgba(31, 41, 55, 0.65)',
      lightborder: 'rgba(243, 244, 246, 0.65)',
    },
    zIndex: {
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
      auto: 'auto',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
      md:
        '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.9)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.30)',
      none: 'none',
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },

    extend: {
    },
  },
  variants: {
    extend: {},
  },

  plugins: [
    forms,
    ({ addUtilities, theme, variants }) => {
      const borderColor = flattenColorPalette(theme('borderColor'))
      delete borderColor.default

      const colorMap = Object.keys(borderColor).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: borderColor[color] },
        [`.border-r-${color}`]: { borderRightColor: borderColor[color] },
        [`.border-b-${color}`]: { borderBottomColor: borderColor[color] },
        [`.border-l-${color}`]: { borderLeftColor: borderColor[color] },
      }))
      const utilities = Object.assign({}, ...colorMap)

      addUtilities(utilities, variants('borderColor'))
    },
  ],
}

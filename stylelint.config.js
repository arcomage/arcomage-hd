/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind'],
      },
    ],
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['FatNumber', 'RobotoCondensed', 'Erathian'],
      },
    ],
    'scss/load-no-partial-leading-underscore': null,
    'scss/operator-no-newline-after': null,
    'scss/dollar-variable-pattern': null,
  },
}

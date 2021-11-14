module.exports = {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  printWidth: 80,
  overrides: [
    {
      files: 'src/**/*.html.ejs',
      options: {
        printWidth: 1000,
      },
    },
    {
      files: 'src/i18n/langs.ts',
      options: {
        printWidth: 1000,
      },
    },
  ],
}

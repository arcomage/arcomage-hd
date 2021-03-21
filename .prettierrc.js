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
        printWidth: 140,
      },
    },
  ],
}

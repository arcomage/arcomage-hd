# Maintenance Notes

## App Version Update

- Use yarn v1 instead of yarn v2 or npm
  - `yarn config set version-tag-prefix "v"` and `yarn config set version-git-message "chore: bump version to v%s"` (if `version-tag-prefix` and `version-git-message` are not set yet)
- `husky` and `commitlint` execute `yarn test` and lint the commit message before every commit
- If a new version is decided to be released, do these:
  - Commit all changes
  - `yarn version`, enter new version number. It'll automatically add a new version and tag, push, and deploy

## Other Update

- When `scripts` **package.json** are updated, also update the tools below
- When a new language is added, also update `og:locale:alternate` in **./src/index.html.ejs**
- If description changes, search the first few words in the whole project and replace them (**./assets/logo/manifest.template.ts**, **./webpack.config.js**, **./package.json**, **./src/i18n/main/en.ts** should be changed and **./assets/logo/manifest.json** should be updated)

## Tools

- `yarn tool:zhconvert`: zh-Hans to zh-Hant conversion ('cards' & 'main', not 'taverns')
- `yarn tool:imgpc`: extract (crop) images from the big image of the original game
- `yarn tool:imgmin`: minify images (_./img-min/original_ stores minified PNG images before their conversion to .webp)
- `yarn tool:datapc`: get card data from the Excel file
- `yarn tool:taverns`: get tavern data from the Excel file
- `yarn tool:geticelist`: get free STUN server list
- `yarn tool:manifest`: generate manifest.json and icons
- `yarn tool:ocr:pre`: prepare ocr
- `yarn tool:ocr`: get card text in different languages
- `yarn tool:i18ncheck:card`: check card i18n
- `yarn tool:i18ncheck:main`: check main i18n
- `yarn tool:calcscore`: get all card scores (for AI)
- `yarn tool:cardbalance`: get accumulated card effect result (for balancing card probs)
- `yarn tool:i18nextract`: extract tavern translations
- `yarn tool:i18njs2text`: i18n script to pure text
- `yarn tool:i18ntext2js`: i18n pure text to script
- `yarn tool:cardsbk`: backup card data to _./\_\_test\_\_/cardsbk.ts_
- `yarn tool:resizesvg`: resize SVG images in _./misc/readme_images/_
- `yarn tool:reduxreducers`: Redux DevTools auto-generated reducer test remove duplicate
- `yarn tool:prettier`: check with prettier
- `yarn tool:eslint`: check with eslint
- `yarn tool:linecount`: get total line count

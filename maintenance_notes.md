# Maintenance Notes

## Dependency Update

* `rxjs` uses the latest `6.x`, instead of `7.x`
  * `redux-observable` uses the latest `1.x`, instead of `2.x`

## App Version Update

* Use yarn v1 instead of v2
  * `yarn config set version-tag-prefix "v"` and `yarn config set version-git-message "chore: bump version to v%s"` (if `version-tag-prefix` and `version-git-message` are not set yet)
* `husky` and `commitlint` execute `yarn test` and lint the commit message before every commit
* If a new version is decided to be released, do these:
  * Commit all changes
  * `yarn version`, enter new version number. It'll automatically add a new version and tag, push, and deploy

## Tools

* `yarn tool:zhconvert`: zh-Hans to zh-Hant conversion ('cards' & 'main', not 'taverns')
* `yarn tool:imgpc`: extract (crop) images from the big image of the original game
* `yarn tool:imgmin`: minify images (*./img-min/original* stores minified PNG images before their conversion to .webp)
* `yarn tool:datapc`: get card data from the Excel file
* `yarn tool:taverns`: get tavern data from the Excel file
* `yarn tool:geticelist`: get free STUN server list
* `yarn tool:manifest`: generate manifest.json and icons
* `yarn tool:ocr:pre`: prepare ocr
* `yarn tool:ocr`: get card text in different languages
* `yarn tool:i18ncheck:card`: check card i18n
* `yarn tool:i18ncheck:main`: check main i18n
* `yarn tool:calcscore`: get all card scores (for AI)
* `yarn tool:i18nextract`: extract tavern translations
* `yarn tool:i18njs2text`: i18n script to pure text
* `yarn tool:i18ntext2js`: i18n pure text to script
* `yarn tool:cardsbk`: backup card data to *./\_\_test\_\_/cardsbk.ts*
* `yarn tool:resizesvg`: resize SVG images in *./misc/readme_images/*
* `yarn tool:reduxreducers`: Redux DevTools auto-generated reducer test remove duplicate
* `yarn tool:prettier`: check with prettier 
* `yarn tool:eslint`: check with eslint 
* `yarn tool:linecount`: get total line count

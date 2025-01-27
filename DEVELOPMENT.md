# Development Notes

## Common Dev, Version Update and Deployment

- Installation
  - `yarn`
- Common development
  - You may need to use `export NODE_OPTIONS=--openssl-legacy-provider` before `yarn start`
  - `yarn start`
- If a new version will be released, check first then commit:
  - `yarn checkall`
  - `git add .`
  - `git commit -m "<YOURMESSAGE>"`
- Then bump, tag and push the new version
  - `yarn tool:version a.b.c` can now do the following things automatically:
    - `yarn version a.b.c`
    - `git add .`
    - `git commit -m "chore: bump version to va.b.c"`
    - `git tag -a va.b.c -m "chore: bump version to va.b.c"`
    - `git push --follow-tags`

## Other Update

- When a new language is added, also update `og:locale:alternate` in **./src/index.html.ejs**
- If description changes, search the first few words in the whole project and replace them (**./assets/logo/manifest.template.ts**, **./webpack.config.js**, **./package.json**, **./src/i18n/main/en.ts** should be changed and **./assets/logo/manifest.json** should be updated)
- (`husky` and `commitlint` are not used anymore)

## Tools & Scripts

- `yarn`: install dependencies
- `yarn start`: start the project in development mode
- `yarn build`: build the project in production mode
- `yarn build:local`: build the project in production & local mode
- `yarn checkall`: test + prettier + eslint + typecheck
- `yarn test`: test with Jest
- `yarn tool:prettier`: check with prettier
- `yarn tool:eslint`: check with eslint
- `yarn tool:typecheck`: check TypeScript types
- `yarn tool:version a.b.c`: update the version to a.b.c in package.json, create tag and commit change
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
- `yarn tool:linecount`: get total line count

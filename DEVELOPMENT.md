# Development Notes for [ArcoMage HD](https://arcomage.github.io/)

## Common Dev, Version Update, and Deployment

- Install dependencies:
  - `yarn`
- Start the project in development mode:
  - `yarn start`
- Before releasing a new version, run the checks:
  - `yarn checkall`
  - `git add .`
  - `git commit -m "<YOURMESSAGE>"`
- To bump the version, tag it, and push:
  - `yarn tool:version a.b.c`
  - This will automatically handle the following tasks:
    - `yarn version a.b.c`
    - `git add .`
    - `git commit -m "chore: bump version to va.b.c"`
    - `git tag -a va.b.c -m "chore: bump version to va.b.c"`
    - `git push --follow-tags`

## Other Updates

- When adding a new language, also update `og:locale:alternate` in **./src/index.html.ejs**.
- If there are changes to the description, search the first few words in the entire project and replace them:
  - The following files should be updated:
    - **./assets/logo/manifest.template.ts**
    - **./webpack.config.js**
    - **./package.json**
    - **./src/i18n/main/en.ts**
  - The following file should be regenerated:
    - **./assets/logo/manifest.json**
- **Husky** and **commitlint** are no longer used.

## Tools & Scripts

- `yarn`: Install dependencies
- `yarn start`: Start the project in development mode
- `yarn build`: Build the project in production mode
- `yarn build:local`: Build the project in both production and local mode
- `yarn checkall`: Run format with Prettier, lint with ESLint, and check types (`yarn test` is not included)
- `yarn test`: Run tests with Jest (currently broken after 2025 upgrade (v1.5.0) and not used)
- `yarn format`: Format code using Prettier
- `yarn lint`: Lint code using ESLint
- `yarn typecheck`: Check TypeScript types
- `yarn tool:ts <file>`: Run a TypeScript file (e.g., `yarn tool:ts ./tools/zhconvert`). It is recommended to install [bun](https://bun.sh/) and use `bun ./tools/zhconvert` instead
- `yarn tool:version a.b.c`: Update the version to `a.b.c` in `package.json`, create a tag, and commit changes
- `yarn tool:zhconvert`: Convert text from zh-Hans to zh-Hant (used for 'cards' & 'main', not 'taverns')
- `yarn tool:imgpc`: Extract (crop) images from the original game’s big image
- `yarn tool:imgmin`: Minify images (the minified PNG images are stored in `./img-min/original/` before being converted to .webp)
- `yarn tool:datapc`: Extract card data from an Excel file
- `yarn tool:taverns`: Extract tavern data from an Excel file
- `yarn tool:geticelist`: Fetch a free STUN server list
- `yarn tool:manifest`: Generate `manifest.json` and icons
- `yarn tool:ocr:pre`: Prepare OCR processing
- `yarn tool:ocr`: Extract card text in different languages
- `yarn tool:i18ncheck:card`: Check card localization
- `yarn tool:i18ncheck:main`: Check main localization
- `yarn tool:i18ncheck:specific`: Validate all localization with language-specific rules
- `yarn tool:calcscore`: Compute all card scores (for AI)
- `yarn tool:cardbalance`: Analyze accumulated card effect results (for balancing probabilities)
- `yarn tool:i18nextract`: Extract tavern translations
- `yarn tool:i18njs2text`: Convert localization scripts to pure text
- `yarn tool:i18ntext2js`: Convert pure text back to localization scripts
- `yarn tool:cardsbk`: Backup card data to `./__test__/cardsbk.ts`
- `yarn tool:resizesvg`: Resize SVG images in `./misc/readme_images/`
- `yarn tool:reduxreducers`: Remove duplicate auto-generated reducer tests from Redux DevTools
- `yarn linecount`: Get the total line count of the project

**Note:** All `yarn tool:` commands require [bun](https://bun.sh/) to be installed globally. Previously, `yarn tool:ts` (with `ts-node`) was used, but this slower approach is no longer recommended.

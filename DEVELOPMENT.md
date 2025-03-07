# Development Notes for [ArcoMage HD](https://arcomage.github.io/)

## Common Dev, Version Update, and Deployment

- Install dependencies:
  - `bun install`
- Start the project in development mode:
  - `bun dev`
- Before releasing a new version, run the checks:
  - `bun checkall`
  - `git add .`
  - `git commit -m "<YOURMESSAGE>"`
- To bump the version, tag it, and push:
  - `bun version a.b.c` (see tools/version/bump.ts for detailed usage)
  - This will automatically handle the following tasks:
    - check if git dirty
    - write new version to package.json
    - `git add package.json`
    - `git commit -m "chore: bump version to va.b.c"`
    - `git tag -a va.b.c -m "chore: bump version to va.b.c"`
    - `git push --follow-tags`

## Other Updates

- When adding a new language, also update `og:locale:alternate` in **./index.html**.
- Settings are mostly in ./src/constants/\*.ts, ./index.html, ./assets/logo/manifest.template.ts, ./package.json, etc.

## Tools & Scripts

- `bun install`: Install dependencies
  - `bun install:nooptional`: Install dependencies without optional dependencies (temporarily remove optional dependencies in package.json and re-add them after install. Used by CI)
- `bun upgrade`: Upgrade dependencies to the latest compatible versions
- `bun dev`: Start the project in development mode
  - `bun dev --host` or `bun preview --host`: Run the project in development/production mode and expose it to the local network (on devices on the same wifi/network, go to `http://192.168.?.?:PORT` to view the app)
  - `./tools/manifest` generates json object of `manifest.json` and icon files from ./assets/logo/, it runs automatically before each start or build, see `vite.config.ts`
- `bun run build`: Build the project in production mode
- `bun preview`: Preview the built project in production mode (does not include build process)
- `bun checkall`: Run format with Prettier, lint with ESLint, check types, and run basic tests (see below)
- `bun test`: Run basic tests (Jest tests from < v1.5 are not yet all migrated after v1.5's upgrade/migration to react 19 & bun)
- `bun format`: Format code using Prettier
- `bun lint`: Lint code using ESLint
- `bun typecheck`: Check TypeScript types
- `bun version a.b.c`: Update the version to `a.b.c` in `package.json`, create a tag, and commit changes (see tools/version/bump.ts for detailed usage)
- `bun tool:zhconvert`: Convert text from zh-Hans to zh-Hant (used for 'cards' & 'main', not 'taverns')
- `bun tool:imgpc`: Extract (crop) images from the original game’s big image
- `bun tool:imgmin`: Minify images (the minified PNG images are stored in `./img-min/original/` before being converted to .webp)
- `bun tool:genimgimports`: Generate card image imports in `./src/data/cardImgImports.ts` (unused & not generated for now)
- `bun tool:datapc`: Extract card data from an Excel file
- `bun tool:taverns`: Extract tavern data from an Excel file
- `bun tool:geticelist`: Fetch a free STUN server list
- `bun tool:ocr:pre`: Prepare OCR processing
- `bun tool:ocr`: Extract card text in different languages
- `bun tool:i18ncheck:card`: Check card localization
- `bun tool:i18ncheck:main`: Check main localization
- `bun tool:i18ncheck:specific`: Validate all localization with language-specific rules
- `bun tool:calcscore`: Compute all card scores (for AI)
- `bun tool:cardbalance`: Analyze accumulated card effect results (for balancing probabilities)
- `bun tool:i18nextract`: Extract tavern translations
- `bun tool:i18njs2text`: Convert localization scripts to pure text
- `bun tool:i18ntext2js`: Convert pure text back to localization scripts
- `bun tool:cardsbk`: Backup card data to `./__test__/cardsbk.ts`
- `bun tool:resizesvg`: Resize SVG images in `./misc/readme_images/`
- `bun tool:reduxreducers`: Remove duplicate auto-generated reducer tests from Redux DevTools
- `bun linecount`: Get the total line count of the project

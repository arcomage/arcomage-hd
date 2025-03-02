# Changelog for [ArcoMage HD](https://arcomage.github.io/)

_Summary of changes for major & minor releases. For detailed changes, click the version number links below to view a comparison containing a list of git commit messages, or check the issue & PR pages._

_To ensure you're using the latest version, open the game and press <kbd>Ctrl</kbd> + <kbd>F5</kbd> to clear the cache and reload the webpage._

<!-- ## [v1.6.0](https://github.com/arcomage/arcomage-hd/compare/v1.5.0...v1.6.0) (2025-?-?) (in progress)

- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2025-02-26..*); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2025-02-26..*)) -->

## [v1.5.0](https://github.com/arcomage/arcomage-hd/compare/v1.4.3...v1.5.0) (2025-02-25) (in beta testing phase)

- [Major Library changes](https://github.com/arcomage/arcomage-hd/issues/78)
  - Major Upgrade: React 19, Redux 5, RxJS 7.8, etc.
  - Removed: Webpack and related libs, Yarn, JSS, Jest and related libs, Enzyme, Testing Library, MUI, Husky, commitlint, Howler, classnames/clsx, copy-to-clipboard, some eslint plugins, ts-node, some polyfills (including pwacompat),etc.
  - Added: Bun, Vite, [React Compiler](https://react.dev/learn/react-compiler), etc.
- [Automatic update (and/or showing notification) of the game in PWA or non PWA](https://github.com/arcomage/arcomage-hd/issues/106)
- [Full control with mouse, touch device, keyboard, or gamepad](https://github.com/arcomage/arcomage-hd/issues/93) 🖱️📱⌨️🎮 ([instructions](gamecontrols.md)) (gamepad has basic support and is not fully finished)
- At game end screen, [show reasons for win/loss/draw](https://github.com/arcomage/arcomage-hd/issues/84), [add "Review cards" button](https://github.com/arcomage/arcomage-hd/issues/101)
- [Add scroll bar in window](https://github.com/arcomage/arcomage-hd/issues/98), [window layout issue in mobile](https://github.com/arcomage/arcomage-hd/issues/105)
- [Optimization](https://github.com/arcomage/arcomage-hd/issues/100) of: [AnimatedNumber](https://github.com/arcomage/arcomage-hd/issues/95) (rewritten), [Tower/Wall/Resource/ResourceProd/Card anim and rerenders](https://github.com/arcomage/arcomage-hd/issues/100), [tooltip](https://github.com/arcomage/arcomage-hd/issues/103) (rewritten), [debounced number input](https://github.com/arcomage/arcomage-hd/issues/81) (rewritten), lang change, remove useless code in bundle, etc.
- [LTR / Arabic support](https://github.com/arcomage/arcomage-hd/issues/90)
- Fix some bugs including a [window load bug](https://github.com/arcomage/arcomage-hd/issues/104) and others
- Fixes and improvements to accessibility (a11y)
- Button & tooltip color change
- CI update, replaced husky git hooks with custom script
- Docs update
- Easter egg when clicking on birds
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2025-01-26..2025-02-25); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2025-01-26..2025-02-25))

## [v1.4.0](https://github.com/arcomage/arcomage-hd/compare/v1.3.0...v1.4.3) ([2025-01-25](https://github.com/arcomage/arcomage-hd/tree/552bf596a98d403310345efe7afc7c067938d489))

- Fix for [iOS 13+ long press to discard a card](https://github.com/arcomage/arcomage-hd/issues/74), [landscape notice](https://github.com/arcomage/arcomage-hd/issues/87)
- [Disable animation](https://github.com/arcomage/arcomage-hd/issues/88), [bold font](https://github.com/arcomage/arcomage-hd/issues/72) options
- [All cards unusable](https://github.com/arcomage/arcomage-hd/issues/76#issuecomment-2054153524), [victory condition](https://github.com/arcomage/arcomage-hd/issues/81) tooltips
- Updated many dependent libraries (but not all to the latest versions)
- [PWA update from network](https://github.com/arcomage/arcomage-hd/issues/68)
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-12-08..2025-01-25); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-12-08..2025-01-25))

## [v1.3.0](https://github.com/arcomage/arcomage-hd/compare/v1.2.0...v1.3.0) ([2021-12-07](https://github.com/arcomage/arcomage-hd/tree/66c90ee521da676275d5c58dd8d1432feedd056e))

- Added [more visual options](https://github.com/arcomage/arcomage-hd/issues/61)
- Introduced [stereo audio panning](https://github.com/arcomage/arcomage-hd/issues/64)
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-11-16..2021-12-07); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-11-16..2021-12-07))

## [v1.2.0](https://github.com/arcomage/arcomage-hd/compare/v1.1.0...v1.2.0) ([2021-11-15](https://github.com/arcomage/arcomage-hd/tree/fe7e056e5620b360689d7c782c00612cb3a66e46))

- UX/UI improvements and [bug](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-09-26..2021-11-15+label%3Abug) fixes
- Updated to rxjs 7
- [I18N](https://github.com/arcomage/arcomage-hd/issues/9) improvements (+ [Ukrainian](https://github.com/arcomage/arcomage-hd/pull/48))
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-09-27..2021-11-15); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-09-27..2021-11-15))

## [v1.1.0](https://github.com/arcomage/arcomage-hd/compare/v1.0.0...v1.1.0) ([2021-09-26](https://github.com/arcomage/arcomage-hd/tree/ae1e782771c2db894a4c441eebd441a6d962ff46))

- [AI level](https://github.com/arcomage/arcomage-hd/issues/45) adjustments
- Added [Pixelation Mode](https://github.com/arcomage/arcomage-hd/issues/44)
- [I18N](https://github.com/arcomage/arcomage-hd/issues/9) improvements (+ Japanese)
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-07-20..2021-09-26); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-07-20..2021-09-26))

## [v1.0.0](https://github.com/arcomage/arcomage-hd/compare/v1.0.0-beta.1...v1.0.0) ([2021-07-19](https://github.com/arcomage/arcomage-hd/tree/b0300d12aaab51f3c087411b2912906c9fbabe0e))

- Basic features implemented
- [Mobile screen adaptation](https://github.com/arcomage/arcomage-hd/issues/1)
- [PWA](https://github.com/arcomage/arcomage-hd/issues/16) support
- Added [manual image](https://github.com/arcomage/arcomage-hd/issues/19)
- Implemented [multiplayer mode](https://github.com/arcomage/arcomage-hd/issues/10)
- [Bug](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-04-01..2021-07-19+label%3Abug) fixes
- [I18N](https://github.com/arcomage/arcomage-hd/issues/9) improvements (+ Czech, Spanish, Italian, Polish, [Brazilian Portuguese](https://github.com/arcomage/arcomage-hd/pull/36), [Russian](https://github.com/arcomage/arcomage-hd/pull/14))
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A2021-04-01..2021-07-19); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-04-01..2021-07-19))

## v1.0.0-beta.1 ([2021-04-01](https://github.com/arcomage/arcomage-hd/tree/494f4782b456be59753880e2ca9b4aebe805bf0f))

- Very basic unstable version
- [I18N](https://github.com/arcomage/arcomage-hd/issues/9) (English, French, German, Simplified Chinese, Traditional Chinese)
- And more ([issue list](https://github.com/arcomage/arcomage-hd/issues?q=is%3Aissue+is%3Aclosed+closed%3A*..2021-04-01); [PR list](https://github.com/arcomage/arcomage-hd/pulls?q=is%3Apr+is%3Aclosed+merged%3A*..2021-04-01))

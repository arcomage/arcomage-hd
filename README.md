<p align="center"><a href="https://arcomage.github.io/"><img width="250" src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/logo/logo.svg" alt="ArcoMage HD logo"><br><br><strong>arcomage.github.io</strong></a></p>

<h1 align="center">ArcoMage HD - Open Source Card Game</h1>

**ArcoMage HD** is a web-based, free and open source, remastered 3D clone of 3DO and New World Computing's 2000 PC card game, _Arcomage_, which was featured in the _Might and Magic_ RPG series.

This non-profit fan remake brings the classic tower defense and resource management fantasy game to modern platforms, and is developed by [@tomchen](https://github.com/tomchen) using TypeScript, React, Redux, redux-observable, RxJS, CSS animations, and WebRTC (see [§ Development](#development)). If you enjoy the game, please support me by starring the repository or following me on [GitHub](https://github.com/tomchen).

ArcoMage HD is available in 14 languages: English, French, German, Simplified Chinese, Traditional Chinese, Spanish, Italian, Russian, Czech, Polish, Brazilian Portuguese, Japanese, Ukrainian, and Arabic (with RTL support). ([§ Translation Credits](#translation-credits))

It's compatible with the latest versions of <a href="https://www.google.com/chrome/" title="Google Chrome"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/chrome.svg" alt="Google Chrome" width="21px" height="21px"></a> <a href="https://www.mozilla.org/firefox/browsers/" title="Firefox"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/firefox.svg" alt="Firefox" width="21px" height="21px"></a> <a href="https://www.apple.com/safari/" title="Safari 14+"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/safari.svg" alt="Safari 14+" width="21px" height="21px"></a> <a href="https://www.microsoft.com/edge" title="Microsoft Edge"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/edge.svg" alt="Microsoft Edge" width="21px" height="21px"></a> <a href="https://www.opera.com/" title="Opera"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/opera.svg" alt="Opera" width="21px" height="21px"></a> <a href="https://www.samsung.com/us/support/owners/app/samsung-internet" title="Samsung Internet"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/samsung_internet.svg" alt="Samsung Internet" width="21px" height="21px"></a> and other modern browsers.

The game is fully responsive, supporting desktop, tablet, and mobile devices 🖥️💻📱. [As a PWA, you can install it and play offline](#play-offline-pwa). It is fully controllable with [mouse](gamecontrols.md#mouse), [touch device](gamecontrols.md#touch-device), [keyboard](gamecontrols.md#keyboard), or [gamepad](gamecontrols.md#gamepad) 🖱️📱⌨️🎮, and includes comprehensive [accessibility features for users with disabilities](#game-controls--accessibility).

By default, you'll play against the computer AI 🤖 in Single Player Mode. You can also switch to [Multiplayer Mode 🧑‍🤝‍🧑](#multiplayer-mode).

<p align="center"><a href="https://arcomage.github.io/"><strong>Click here to play it now!</strong><br><br><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/misc/ogimage.jpg" alt="ArcoMage HD screenshot"></a></p>

<p align="center">
<a href="https://github.com/arcomage/arcomage-hd/blob/main/CHANGELOG.md"><img src="https://img.shields.io/github/package-json/v/arcomage/arcomage-hd" alt="version number"></a>
<a href="https://github.com/arcomage/arcomage-hd/actions/workflows/test.yml"><img src="https://github.com/arcomage/arcomage-hd/actions/workflows/test.yml/badge.svg" alt="Actions Status"></a>
<a href="https://github.com/arcomage/arcomage-hd/blob/main/CREDIT.md"><img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License"></a>
</p>

## Gameplay

<p align="center"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/manual.jpg" alt="ArcoMage HD Manual Image"></a></p>

<details><summary><strong>Click to view the game rules in text format</strong></summary>

> Victory conditions vary per tavern. Build your tower, destroy your opponent's tower, or collect enough resources before your opponent does.
>
> Large yellow numbers in column are the productions. This is how many new units of a particular resource you will receive on your next turn. Small black numbers in column are the resources. This is how many units you have available to spend on your current turn.
>
> Cards: Each have their own cost to play, indicated in a small circle in the lower right corner of the card. The cost will be deducted from your resources according to the color of the card. Left click on a card plays the card. Right click on a card to discard without playing.
>
> Red represents your Quarry Generator which produces your Brick 🧱 resources, blue represents your Magic Generator which produces Gem 💎 resources, green represents your Dungeon (aka. Zoo) generator which produces Recruit (aka. Beast) 🐲 resources.

</details>

## Play Offline (PWA)

The image and sound files, along with your card and language settings, are automatically stored in your browser. Additionally, you can install this "Progressive Web App" (PWA) on your computer or smartphone. For installation instructions, please refer to [Google Chrome's guide](https://support.google.com/chrome/answer/9658361) and [Mozilla's guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installing).

Depending on your browser, you may need to press <kbd>Ctrl</kbd> + <kbd>F5</kbd> to clear the cache and reload the [arcomage.github.io](https://arcomage.github.io) webpage to ensure you're using the latest version of the game.

## Game Controls & Accessibility

The game is fully controllable using either a **[mouse](gamecontrols.md#mouse)**, **[touch device](gamecontrols.md#touch-device)**, **[keyboard](gamecontrols.md#keyboard)**, or **[gamepad](gamecontrols.md#gamepad)** (click these links to view detailed instructions).

The game is fully compatible with and easy to use with a [screen reader](https://en.wikipedia.org/wiki/Screen_reader). You can also disable animations in the graphics settings if desired.

<p align="center">
<a href="https://arcomage.github.io/" title="Blind Friendly"><img src="https://img.shields.io/badge/-Blind_Friendly-black" alt="Blind Friendly"></a>
<a href="https://arcomage.github.io/" title="Color Blind Friendly"><img src="https://img.shields.io/badge/-Color_Blind_Friendly-white" alt="Color Blind Friendly"></a>
<a href="https://arcomage.github.io/" title="Deaf Friendly"><img src="https://img.shields.io/badge/-Deaf_Friendly-purple" alt="Deaf Friendly"></a>
<a href="https://arcomage.github.io/" title="Motion Sickness Friendly"><img src="https://img.shields.io/badge/-Motion_Sickness_Friendly-yellow" alt="Motion Sickness Friendly"></a>
</p>

## Multiplayer Mode

### How to Use Multiplayer Mode

https://user-images.githubusercontent.com/529949/115864733-941cbd00-a437-11eb-955d-f6a341c8ea64.mp4

1. Both players enable "Multiplayer" Mode (click the gear ⚙️ icon in the game to open the "Preferences" window)
2. Bob 🧝 must copy and **share his ID with Alice 👧 via Discord, forums, etc.**
3. Alice 👧 enters Bob 🧝's ID and connects to him
4. Alice 👧 becomes the host 🏠 (her computer deals the cards), and Bob 🧝 is the guest 💼

**Note:** Multiplayer Mode may not function if both players are behind symmetric NAT. You can [test if you're behind "bad", symmetric NAT](https://tomchen.github.io/symmetric-nat-test/).

<details><summary><strong>Click to show technical details</strong></summary>

### Technical Details

In Multiplayer Mode, the game connects directly to the opponent (Peer-to-Peer, P2P) without using a server. However, we still rely on free public [STUN](https://en.wikipedia.org/wiki/STUN) servers (set up by Google and others) for peer discovery. Once connected using the ID assigned by the server, the players are directly connected and no longer need the server.

The game doesn't use any servers, so there isn't a central "list of online players" for easy matchmaking. Instead, you must share your ID with your opponent through platforms like Discord.

For more details, see [WebRTC (Web Real-Time Communication)](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) and [PeerJS library](https://peerjs.com/).

Currently, since the game doesn't use a [TURN](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT) server, it cannot connect two users who are both behind symmetric NAT (a rare scenario).

</details>

## Troubleshooting

If you're experiencing performance issues while running the game, or if the game doesn't run at all in your browser (likely an older or non-major browser), you can refer to the [troubleshooting guide](troubleshooting.md). It includes a [list of tested browsers](troubleshooting.md#browser-list) that are known to run the game without major issues. Additionally, you may consider installing the Windows [Desktop Version](troubleshooting.md#desktop-version) of the game ([click to download](https://github.com/arcomage/arcomage-hd/releases/download/v1.0.0-beta.26/ArcoMage.HD.Setup.1.0.0.7z)), though please note that the current desktop version is not recommended in most cases.

If you encounter any issues, please [open an issue](https://github.com/arcomage/arcomage-hd/issues).

## Development

The stack :

<p align="center">
<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/typescript-icon.svg" alt="Typescript" width="21px" height="21px"></a>
<a href="https://reactjs.org/" title="React"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/react.svg" alt="React" width="21px" height="21px"></a>
<a href="https://redux.js.org/" title="Redux"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/redux.svg" alt="Redux" width="21px" height="21px"></a>
<a href="https://github.com/redux-observable/redux-observable" title="redux-observable"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/redux-observable.svg" alt="redux-observable" width="21px" height="21px"></a>
<a href="https://rxjs.dev/" title="RxJS (ReactiveX)"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/reactivex.svg" alt="RxJS (ReactiveX)" width="21px" height="21px"></a>
<a href="https://webrtc.org/" title="WebRTC"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/webrtc.svg" alt="WebRTC" width="21px" height="21px"></a>
<a href="https://developers.google.com/web/tools/workbox" title="Workbox"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/workbox-icon.svg" alt="Workbox" width="21px" height="21px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/javascript.svg" alt="JavaScript" width="21px" height="21px"></a>
<a href="https://tc39.es/ecma262/" title="ECMAScript 6+"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/es6.svg" alt="ECMAScript 6+" width="21px" height="21px"></a>
<a href="https://bun.sh/" title="bun"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/bun.svg" alt="bun" width="21px" height="21px"></a>
<a href="https://vite.dev/" title="Vite"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/vite.svg" alt="Vite" width="21px" height="21px"></a>
<a href="https://sass-lang.com/" title="Sass"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/sass.svg" alt="Sass" width="21px" height="21px"></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/tailwindcss-icon.svg" alt="Tailwind CSS" width="21px" height="21px"></a>
<a href="https://cssinjs.org/" title="JSS"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/jss.svg" alt="JSS" width="21px" height="21px"></a>
<a href="https://prettier.io/" title="Prettier"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/prettier.svg" alt="Prettier" width="21px" height="21px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/eslint.svg" alt="ESLint" width="21px" height="21px"></a>
<a href="https://github.com/postcss/postcss" title="PostCSS"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/postcss.svg" alt="PostCSS" width="21px" height="21px"></a>
<a href="https://github.com/postcss/autoprefixer" title="Autoprefixer"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/autoprefixer.svg" alt="Autoprefixer" width="21px" height="21px"></a>
<a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
<a href="https://testing-library.com/" title="Testing Library"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/testing-library.svg" alt="Testing Library" width="21px" height="21px"></a>
<a href="https://istanbul.js.org/" title="Istanbul"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/istanbul.svg" alt="Istanbul" width="21px" height="21px"></a>
<a href="https://codecov.io/" title="Codecov"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/codecov.svg" alt="Codecov" width="21px" height="21px"></a>
<a href="https://inkscape.org/" title="Inkscape"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/inkscape.svg" alt="Inkscape" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/illustrator.html" title="Adobe Illustrator"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/adobe-illustrator.svg" alt="Adobe Illustrator" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/photoshop.html" title="Adobe Photoshop"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/adobe-photoshop.svg" alt="Adobe Photoshop" width="21px" height="21px"></a>
</p>

Used in ≤1.4 but not in 1.5+:

<p align="center">
<a href="https://yarnpkg.com/" title="yarn"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/yarn.svg" alt="yarn" width="21px" height="21px"></a>
<a href="https://webpack.js.org/" title="webpack"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/webpack.svg" alt="webpack" width="21px" height="21px"></a>
<a href="https://material-ui.com/" title="Material-UI"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/material-ui.svg" alt="Material-UI" width="21px" height="21px"></a>
<a href="https://jestjs.io/" title="Jest"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/jest.svg" alt="Jest" width="21px" height="21px"></a>
<a href="https://github.com/enzymejs/enzyme" title="Enzyme"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/enzyme.svg" alt="Enzyme" width="21px" height="21px"></a>
<a href="https://howlerjs.com/" title="howler.js"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/howler.svg" alt="howler.js" width="21px" height="21px"></a>
</p>

[TypeScript](https://www.typescriptlang.org/) + [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [redux-observable](https://redux-observable.js.org/) + [RxJS](https://rxjs.dev/). [PWA](https://web.dev/progressive-web-apps/) (using [Workbox](https://developers.google.com/web/tools/workbox)).

The game doesn't use [rAF](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (except for a few cases), [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), or `<canvas>` at all. Instead, it relies on DOM and CSS-based animations, which can improve SEO and accessibility, while making it feel more like a "standard web app." While CSS animations may not perform as well as `<canvas>`, they still provide excellent performance on Blink-based browsers on modern devices.

The game features P2P Multiplayer Mode without a server, utilizing only [STUN](https://en.wikipedia.org/wiki/STUN) servers for peer discovery and [WebRTC](https://webrtc.org/) (with [PeerJS](https://peerjs.com/)) for communication.

It also supports stereo sound, WebP and SVG images, with images upscaled using the [waifu2x](https://github.com/nagadomi/waifu2x) / [waifu2x-caffe](https://github.com/lltcggie/waifu2x-caffe) libraries. Card text is extracted using the OCR library [tesseract.js](https://tesseract.projectnaptha.com/).

Developer scripts and tools are located in the [`tools` folder](https://github.com/arcomage/arcomage-hd/tree/main/tools). For more details, see the [development notes](https://github.com/arcomage/arcomage-hd/blob/main/DEVELOPMENT.md), [changelog](CHANGELOG.md), and the `scripts` section in [`package.json`](https://github.com/arcomage/arcomage-hd/blob/main/package.json).

<p align="center">
<a href="https://codecov.io/gh/arcomage/arcomage-hd" title="Codecov"><img src="https://codecov.io/gh/arcomage/arcomage-hd/branch/main/graph/badge.svg?token=5rrZ38jtVr" alt="Codecov"></a>
</p>

<p align="center"><a href="https://developers.google.com/web/tools/lighthouse" title="Google Lighthouse"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/lighthouse.svg" alt="Google Lighthouse" width="32px" height="32px"></a><br>Google Lighthouse score<br><a href="https://github.com/arcomage/arcomage-hd/issues/41"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/lighthouse_score.png" alt="ArcoMage HD Google Lighthouse score"></a></p>

## Translation Credits

- **[Cards](https://github.com/arcomage/arcomage-hd/tree/main/src/i18n/cards)**: Extracted from _Might and Magic VIII_ & _VI_ original games (or translated/retranslated) by:
  - English (`en`): [Black Rabite on GameFAQs](https://gamefaqs.gamespot.com/pc/929601-arcomage/faqs/44131)
  - Russian (`ru`) (retranslated): [rayburn](https://github.com/TombOfVARN)
  - Simplified Chinese (`zh-Hans`): (extracted) [Liar-zzy](https://github.com/Liar-zzy/Arcomage/blob/master/Arcomage.cpp), (fixed/retranslated) [Tom Chen](https://github.com/tomchen)
  - Polish (`pl`) (retranslated): [acidcave](https://www.arcomage.acidcave.net/czerwone_karty.html)
  - Czech (`cs`): Yym
  - Brazilian Portuguese (`pt-BR`) (translated): [mateuscv](https://github.com/mateuscv)
  - Ukrainian (`uk`) (translated): [troyane](https://github.com/troyane)
  - Japanese (`ja`) (translated): [Tom Chen](https://github.com/tomchen) with help from [Google Translate](https://translate.google.com/) & [DeepL](https://www.deepl.com/translator)
  - Arabic (`ar`) (translated): [Tom Chen](https://github.com/tomchen) with help from [Google Translate](https://translate.google.com/)
  - All others: [Tom Chen](https://github.com/tomchen) with OCR tool [tesseract.js](https://tesseract.projectnaptha.com/) & [other scripts](https://github.com/arcomage/arcomage-hd/tree/main/tools)
  - Traditional Chinese (`zh-Hant`): Converted from `zh-Hans` by [Tom Chen](https://github.com/tomchen) using [his scripts](https://github.com/arcomage/arcomage-hd/tree/main/tools/zhconvert) and [opencc-js](https://github.com/nk2028/opencc-js)
- **[Main](https://github.com/arcomage/arcomage-hd/tree/main/src/i18n/main)** string translators (some from the original games):

  - Russian (`ru`): [rayburn](https://github.com/TombOfVARN)
  - Polish (`pl`): (partially by) Plamcia
  - Brazilian Portuguese (`pt-BR`): [mateuscv](https://github.com/mateuscv)
  - Ukrainian (`uk`): [troyane](https://github.com/troyane)
  - All others: [Tom Chen](https://github.com/tomchen) by himself and/or with help from [Google Translate](https://translate.google.com/) & [DeepL](https://www.deepl.com/translator)
  - Traditional Chinese (`zh-Hant`): Converted from `zh-Hans` by [Tom Chen](https://github.com/tomchen) using [his scripts](https://github.com/arcomage/arcomage-hd/tree/main/tools/zhconvert) and [opencc-js](https://github.com/nk2028/opencc-js)

- **[Taverns](https://github.com/arcomage/arcomage-hd/tree/main/src/i18n/taverns)**: Extracted from _Might and Magic VIII_ & _VI_ original games by [Tom Chen](https://github.com/tomchen) using [his script](https://github.com/arcomage/arcomage-hd/tree/main/tools/i18n-extraction). Except for:
  - Brazilian Portuguese (`pt-BR`) (translated): [mateuscv](https://github.com/mateuscv)
  - Japanese (`ja`) (translated): [Tom Chen](https://github.com/tomchen) with help from [Google Translate](https://translate.google.com/) & [DeepL](https://www.deepl.com/translator)
  - Arabic (`ar`) (translated): [Tom Chen](https://github.com/tomchen) with help from [Google Translate](https://translate.google.com/)
  - Ukrainian (`uk`) (translated): [troyane](https://github.com/troyane)

_See also [I18N Issue Page](https://github.com/arcomage/arcomage-hd/issues/9)_

## Arcomage Original Game

Arcomage was initially developed by Stickman Games and later sold to The 3DO Company (3DO). The game appeared as a mini-game in _Might and Magic VII: For Blood and Honor_ (MM7) and _Might and Magic VIII: Day of the Destroyer_ (MM8), the seventh and eighth games in New World Computing (NWC)'s _Might and Magic_ (MM) series. (It's similar to _Gwent_ in _The Witcher_.) NWC and its parent company, 3DO, also released a standalone version in 2000, which can be played in single-player or multiplayer mode. The original standalone Arcomage has a resolution of 800 x 600 pixels and works in 16-bit color mode on Windows 10, but the graphics are unstable.

## Copyright

The code for the ArcoMage HD game: MIT License (c) [Tom Chen](https://tomchen.org/).

The assets, text, appearance, and other copyrightable elements of the game: (c) 2001 The 3DO Company.

See the [CREDIT.md file](CREDIT.md) for a detailed presentation of the copyright status, licenses, and credits for the game's components.

## Links

[![Changelog](https://img.shields.io/badge/-Changelog-green)](CHANGELOG.md) [![Credit](https://img.shields.io/badge/-Credit-yellow)](CREDIT.md) [![MIT License](https://img.shields.io/badge/-MIT_License-pink)](LICENSE.md) [![Development Notes](https://img.shields.io/badge/-Development_Notes-tan)](DEVELOPMENT.md) [![Game Control Details](https://img.shields.io/badge/-Game_Control_Details-blue)](gamecontrols.md) [![Troubleshooting](https://img.shields.io/badge/-Troubleshooting-red)](troubleshooting.md)

 [![Game Home Page](https://img.shields.io/badge/-Game_Home_Page-coral)](https://arcomage.github.io/) [![GitHub Project Page](https://img.shields.io/badge/-GitHub_Project_Page-forestgreen)](https://github.com/arcomage/arcomage-hd) [![Issues](https://img.shields.io/badge/-Issues-darkslateblue)](https://github.com/arcomage/arcomage-hd/issues)   [![@tomchen on GitHub](https://img.shields.io/badge/-@tomchen_on_GitHub-black)](https://github.com/tomchen)

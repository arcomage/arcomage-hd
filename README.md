<p align="center"><a href="https://arcomage.github.io/"><img width="250" src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/logo/logo.svg" alt="ArcoMage HD logo"><br><br><strong>arcomage.github.io</strong></a></p>

<h1 align="center">ArcoMage HD - Open Source Card Game</h1>

**ArcoMage HD** is a web-based, free and open source, remastered 3D clone of 3DO and New World Computing's 2000 PC card game Arcomage, which appeared in the _Might and Magic_ RPG game series.

This non-profit fan-remake of the tower defense, resource management fantasy game is developed by [@tomchen](https://github.com/tomchen) with TypeScript + React + Redux + redux-observable + RxJS + CSS-based animations + WebRTC (see [§ Development](#development)). Please star the repo / follow me to support me.

It's available in 13 languages: English, French, German, Simplified Chinese, Traditional Chinese, Spanish, Italian, Russian, Czech, Polish, Brazilian Portuguese, Japanese, Ukrainian. ([§ Translation Credits](#translation-credits))

It supports latest <a href="https://www.google.com/chrome/" title="Google Chrome"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/chrome.svg" alt="Google Chrome" width="21px" height="21px"></a> <a href="https://www.mozilla.org/firefox/browsers/" title="Firefox"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/firefox.svg" alt="Firefox" width="21px" height="21px"></a> <a href="https://www.apple.com/safari/" title="Safari 14+"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/safari.svg" alt="Safari 14+" width="21px" height="21px"></a> <a href="https://www.microsoft.com/edge" title="Microsoft Edge"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/edge.svg" alt="Microsoft Edge" width="21px" height="21px"></a> <a href="https://www.opera.com/" title="Opera"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/opera.svg" alt="Opera" width="21px" height="21px"></a> <a href="https://www.samsung.com/us/support/owners/app/samsung-internet" title="Samsung Internet"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/browsers/samsung_internet.svg" alt="Samsung Internet" width="21px" height="21px"></a> and other modern browsers. It works best in Chrome and Chrome's Blink engine-based browsers, and may or may not have performance issues in Safari & Firefox ([browser list](#browser-list)). Safari, Firefox, IE users can use [the Desktop Version](#desktop-version) instead. Read [What to do if the game is slow](https://github.com/arcomage/arcomage-hd/issues/66) for detailed solutions.

It supports desktop / tablet / mobile screen 🖥️💻📱. [It's a PWA, meaning you can install it and play it offline](#play-it-offline-pwa). It also has good [accessibility for disabled people](#keyboard-control--accessibility).

By default, you play against computer AI 🤖 in the Single Player Mode. You can switch to [Multiplayer Mode 🧑‍🤝‍🧑](#multiplayer-mode). Note that Multiplayer Mode doesn't work if both players are behind "bad", symmetric NAT ([detect your NAT type](https://tomchen.github.io/symmetric-nat-test/)). Click gear ⚙️ icon in the game to open the "Preferences" window so you can switch to Multiplayer Mode or change other settings.

<p align="center"><a href="https://arcomage.github.io/"><strong>Click to play it now</strong><br><br><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/misc/ogimage.jpg" alt="ArcoMage HD screenshot"></a></p>

<p align="center">
<a href="https://github.com/arcomage/arcomage-hd/blob/main/CHANGELOG.md"><img src="https://img.shields.io/github/package-json/v/arcomage/arcomage-hd" alt="version number"></a>
<a href="https://github.com/arcomage/arcomage-hd/actions/workflows/test.yml"><img src="https://github.com/arcomage/arcomage-hd/actions/workflows/test.yml/badge.svg" alt="Actions Status"></a>
<a href="https://github.com/arcomage/arcomage-hd/blob/main/CREDIT.md"><img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License"></a>
</p>

## Gameplay

<p align="center"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/manual.jpg" alt="ArcoMage HD Manual Image"></a></p>

<details><summary><strong>Click to show game rules in text form</strong></summary>

> Victory conditions vary per tavern. Build your tower, destroy your opponent's tower, or collect enough resources before your opponent does.
>
> Large yellow numbers in column are the productions. This is how many new units of a particular resource you will receive on your next turn. Small black numbers in column are the resources. This is how many units you have available to spend on your current turn.
>
> Cards: Each have their own cost to play, indicated in a small circle in the lower right corner of the card. The cost will be deducted from your resources according to the color of the card. Left click on a card plays the card. Right click on a card to discard without playing.
>
> Red represents your Quarry Generator which produces your Brick 🧱 resources, blue represents your Magic Generator which produces Gem 💎 resources, green represents your Dungeon (aka. Zoo) generator which produces Recruit (aka. Beast) 🐲 resources.

</details>

## Play It Offline (PWA)

The image and sound files, as well as the card and language settings, are automatically stored in your browser. In addition, you can install this "Progressive Web App" (PWA) on your computer or smartphone. Please refer to [Google Chrome's article](https://support.google.com/chrome/answer/9658361) and [Mozilla's article](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Installing) on how to install a PWA.

Depending on your browser, you may need to press <kbd>Ctrl</kbd> + <kbd>F5</kbd> to clear the cache files & reload arcomage.github.io webpage to have the latest version of the game.

PWA or not, some mobile browsers do not remove top and bottom bars in fullscreen mode but it is usually configurable.

## Desktop Version

**If you don't have performance issues playing ArcoMage HD in your browser, then you don't need the Desktop Version.**

Some browsers, such as Firefox and Safari, that are not Chrome's engine based, may (or may not) be a bit slow running ArcoMage HD. In this case, you can use the Desktop Version.

The Desktop Version is **merely a Google Chrome browser-like wrapper** that visits the URL [https://arcomage.github.io/](https://arcomage.github.io/).

[Click to download the Desktop Version (Windows)](https://github.com/arcomage/arcomage-hd/releases/download/v1.0.0-beta.26/ArcoMage.HD.Setup.1.0.0.7z)

### Browser List

<details><summary><strong>Click to show a browser list to help you decide if you need the desktop version</strong></summary>

_(\*: presumably so, though I didn't really test)_

🏆 Browsers based on Chrome's engine, [Blink](https://www.chromium.org/blink), are fully supported by ArcoMage HD (as of 2021). With an average CPU / GPU, you should be able to play the game without performance issues. You don't need ArcoMage HD's Desktop Version:

- Google Chromium
- Google Chrome
- Brave
- Microsoft Edge (new version, from 2019)
- Opera (from 2013) \*
- Android's native browser / WebView \*
- Samsung Internet
- Maxthon \*
- Vivaldi \*
- DuckDuckGo Privacy Browser
- Kiwi Browser
- Dolphin Browser
- QQ Browser \*
- Sogou Browser \*
- Baidu Browser \*
- 360's browsers \*
- WeChat's browser
- Yandex Browser \*
- UC Browser \*
- CM Browser \*
- SRWare Iron \*
- Beaker \*
- Naver Whale \*
- Puffin Browser \*
- etc.

_(If your Chrome-based browser does have performance issues, then the Desktop Version which is a Chrome wrapper cannot help, read the solutions in [What to do if the game is slow](https://github.com/arcomage/arcomage-hd/issues/66))_

✅ Browsers based on Firefox's [Gecko](https://hg.mozilla.org/), Safari's [WebKit](https://webkit.org/) and [Qt WebEngine](https://wiki.qt.io/QtWebEngine) rendering engines, are tested and can be used to play the game, but they may be slightly slower than Chrome-based browser, although it depends on your CPU / GPU. If you find these browsers slow, you may try ArcoMage HD's Desktop Version instead:

- Firefox
  - Pale Moon \*
  - SeaMonkey \*
  - K-Meleon \*
  - Tor Browser \*
  - etc.
- Safari 14+ (and/or iOS 14+) (v13- can run the game but can't see WebP images)
- Browsers based on Qt WebEngine
  - qutebrowser
  - Falkon
  - Dooble \*
  - etc.

❌ Browsers with other rendering engines are not supported, you must change to a Chrome-based browser or use ArcoMage HD's Desktop Version instead:

- Microsoft Internet Explorer (IE)
- Microsoft Edge (old version, before 2019) \*
- Opera (very old version, before 2013) \*
- Lynx \*
- NetSurf
- Links \*
- KaiOS browser \*
- etc.

❌ Very old browsers that [do not support ECMAScript 2015 (ES6)](https://caniuse.com/es6) and [WebP images](https://caniuse.com/webp), are also not supported.

</details>

### Other Remarks

<details><summary><strong>Click to show other remarks on the desktop version</strong></summary>

The Desktop Version is not expected to be updated. The Desktop Version's version number is different from ArcoMage HD's. Actually the Desktop Version may stay at v1.0.0 forever unless there's really something to update.

The first time you run ArcoMage HD Desktop Version, it downloads all the images and sound files silently. You should wait maybe 1 minute (depending on your Internet speed), before you can cut off Internet and play it completely offline.

If you install both Google Chrome and the Desktop Version, the Desktop Version will have independent storage. Clearing your Google Chrome's stored data will not reset the Desktop Version's settings.

</details>

## Keyboard Control & Accessibility

The game is fully controllable with keyboard. Use <kbd>Tab</kbd> (or <kbd>Option (Alt)</kbd> + <kbd>Tab</kbd> in Safari) to select a top-menu icon or a card, then <kbd>Enter</kbd> to open or use it, <kbd>Delete</kbd> / <kbd>Backspace</kbd> to discard a card.

<kbd>Alt</kbd> + <kbd>R</kbd> can reset visual effect settings.

<details><summary><strong>Click to show the detailed keyboard control instruction & additional special "Access Key" usage (e.g. <kbd>Alt</kbd> + <kbd>P</kbd>: Preferences; <kbd>Alt</kbd> + <kbd>1</kbd>: use the 1st card ...)</strong></summary>

### Top Menu

Use <kbd>Tab</kbd> to select an icon (it's <kbd>Option (Alt)</kbd> + <kbd>Tab</kbd> in Safari), then <kbd>Enter</kbd> to open it. When the window is open, use <kbd>Esc</kbd> to close it.

Or with access key (only for opening a window):

- <kbd>Alt</kbd> + <kbd>P</kbd>: Preferences
- <kbd>Alt</kbd> + <kbd>L</kbd>: Language
- <kbd>Alt</kbd> + <kbd>S</kbd>: Sound & Graphics
- <kbd>Alt</kbd> + <kbd>T</kbd>: Toggle Fullscreen
- <kbd>Alt</kbd> + <kbd>H</kbd>: Help
- <kbd>Alt</kbd> + <kbd>G</kbd>: GitHub

When a window is open:

- <kbd>Esc</kbd>: (In Fullscreen Mode) exit the mode, or (not in Fullscreen Mode) cancel & close the current window
- <kbd>Home</kbd> or <kbd>Alt</kbd> + <kbd>C</kbd>: Cancel & close the current window

### Card

Use <kbd>Tab</kbd> to select a card (it's <kbd>Option (Alt)</kbd> + <kbd>Tab</kbd> in Safari), then <kbd>Enter</kbd> to **use** it, or <kbd>Delete</kbd> / <kbd>Backspace</kbd> to **discard** it.

Or with access key (only for using a card):

- <kbd>Alt</kbd> + <kbd>1</kbd>: Use the 1st card
- <kbd>Alt</kbd> + <kbd>2</kbd>: Use the 2nd card
- <kbd>Alt</kbd> + <kbd>3</kbd>: Use the 3rd card
- <kbd>Alt</kbd> + ...: Use the nth card (n <= 9, you can't use the 10th or later cards with access key)

It could be other key instead of <kbd>Alt</kbd>

[The way to activate the accesskey depends on the browser and its platform](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey), it's "<kbd>Alt</kbd> + key" in Chrome Windows/Linux.

</details>

The game is [screen-reader](https://en.wikipedia.org/wiki/Screen_reader) compatible. It did support "[Reduce Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences)" but doesn't support it now due to a [Win11 bug](https://github.com/arcomage/arcomage-hd/issues/88), instead, you can simply disable animation in the graphics settings if you want to.

<p align="center">
<a href="https://arcomage.github.io/" title="Blind Friendly"><img src="https://img.shields.io/badge/-Blind%20Friendly-black" alt="Blind Friendly"></a>
<a href="https://arcomage.github.io/" title="Color Blind Friendly"><img src="https://img.shields.io/badge/-Color%20Blind%20Friendly-white" alt="Color Blind Friendly"></a>
<a href="https://arcomage.github.io/" title="Deaf Friendly"><img src="https://img.shields.io/badge/-Deaf%20Friendly-purple" alt="Deaf Friendly"></a>
<a href="https://arcomage.github.io/" title="Motion Sickness Friendly"><img src="https://img.shields.io/badge/-Motion%20Sickness%20Friendly-yellow" alt="Motion Sickness Friendly"></a>
</p>

## Multiplayer Mode

_(Currently it **can't connect two users who are both behind symmetric NAT** ([test if you're behind "bad", symmetric NAT](https://tomchen.github.io/symmetric-nat-test/)))_

### How To Use the Multiplayer Mode

https://user-images.githubusercontent.com/529949/115864733-941cbd00-a437-11eb-955d-f6a341c8ea64.mp4

Both players enable the "Multiplayer" Mode. Bob 🧝 must copy and **give his ID to Alice 👧 via Discord, forums, etc.**. Alice 👧 then enters Bob 🧝's ID and connects to Bob 🧝. Alice 👧 becomes the host 🏠 (i.e. technically it's her computer that deals cards) and Bob 🧝 is the guest 💼.

<details><summary><strong>Click to show technical details</strong></summary>

### Technical

In Multiplayer Mode, you are connected directly to your opponent (Peer to Peer, P2P) without server. However, we still need free public [STUN](https://en.wikipedia.org/wiki/STUN) servers (set up by Google and others) for the discovery of other peers. Once we use the ID assigned by the server to connect to each other, we are connected directly and don't need the server any more.

The game operates no servers at all, therefore it does not have a server that stores a "list of players online" so you can choose your opponent more easily. You have to instead give your ID to your opponent via Discord or other platforms.

See also [WebRTC (Web Real-Time Communication)](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API) and [PeerJS library](https://peerjs.com/).

Because currently the game uses no [TURN](https://en.wikipedia.org/wiki/Traversal_Using_Relays_around_NAT) server, it can't connect two users who are both behind symmetric NAT (which is a rare case).

</details>

## Development

The stack:

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
<a href="https://sass-lang.com/" title="Sass"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/sass.svg" alt="Sass" width="21px" height="21px"></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/tailwindcss-icon.svg" alt="Tailwind CSS" width="21px" height="21px"></a>
<a href="https://material-ui.com/" title="Material-UI"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/material-ui.svg" alt="Material-UI" width="21px" height="21px"></a>
<a href="https://webpack.js.org/" title="webpack"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/webpack.svg" alt="webpack" width="21px" height="21px"></a>
<a href="https://jestjs.io/" title="Jest"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/jest.svg" alt="Jest" width="21px" height="21px"></a>
<a href="https://github.com/enzymejs/enzyme" title="Enzyme"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/enzyme.svg" alt="Enzyme" width="21px" height="21px"></a>
<a href="https://testing-library.com/" title="Testing Library"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/testing-library.svg" alt="Testing Library" width="21px" height="21px"></a>
<a href="https://istanbul.js.org/" title="Istanbul"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/istanbul.svg" alt="Istanbul" width="21px" height="21px"></a>
<a href="https://codecov.io/" title="Codecov"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/codecov.svg" alt="Codecov" width="21px" height="21px"></a>
<a href="https://cssinjs.org/" title="JSS"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/jss.svg" alt="JSS" width="21px" height="21px"></a>
<a href="https://prettier.io/" title="Prettier"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/prettier.svg" alt="Prettier" width="21px" height="21px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/eslint.svg" alt="ESLint" width="21px" height="21px"></a>
<a href="https://github.com/postcss/postcss" title="PostCSS"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/postcss.svg" alt="PostCSS" width="21px" height="21px"></a>
<a href="https://github.com/postcss/autoprefixer" title="Autoprefixer"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/autoprefixer.svg" alt="Autoprefixer" width="21px" height="21px"></a>
<a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
<a href="https://yarnpkg.com/" title="yarn v1"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/yarn.svg" alt="yarn v1" width="21px" height="21px"></a>
<a href="https://howlerjs.com/" title="howler.js"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/howler.svg" alt="howler.js" width="21px" height="21px"></a>
<a href="https://inkscape.org/" title="Inkscape"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/inkscape.svg" alt="Inkscape" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/illustrator.html" title="Adobe Illustrator"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/adobe-illustrator.svg" alt="Adobe Illustrator" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/photoshop.html" title="Adobe Photoshop"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/adobe-photoshop.svg" alt="Adobe Photoshop" width="21px" height="21px"></a>
</p>

[TypeScript](https://www.typescriptlang.org/) + [React](https://reactjs.org/) + [Redux](https://redux.js.org/) + [redux-observable](https://redux-observable.js.org/) + [RxJS](https://rxjs.dev/). [PWA](https://web.dev/progressive-web-apps/) (using [Workbox](https://developers.google.com/web/tools/workbox)).

The game doesn't use [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [rAF](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame), or \<canvas\> at all. Instead, it uses DOM & CSS-based animations which may be better for SEO and accessibility and make it more like "standard web app". CSS animation's performance is not as good as \<canvas\>'s, but still quite good in Blink-based browsers in modern devices.

P2P Multiplayer Mode without server (only uses [STUN](https://en.wikipedia.org/wiki/STUN) servers for the discovery of other peers) with [WebRTC](https://webrtc.org/) (using [PeerJS](https://peerjs.com/)).

Stereo sound. WebP & SVG images; images upscaled with the library [waifu2x](https://github.com/nagadomi/waifu2x) / [waifu2x-caffe](https://github.com/lltcggie/waifu2x-caffe). Card text extracted with the OCR library [tesseract.js](https://tesseract.projectnaptha.com/).

Dev scripts / tools are in the [`tools` folder](https://github.com/arcomage/arcomage-hd/tree/main/tools), see also [dev notes](https://github.com/arcomage/arcomage-hd/blob/main/DEVELOPMENT.md) and `scripts` section in [`package.json`](https://github.com/arcomage/arcomage-hd/blob/main/package.json). [yarn](https://yarnpkg.com/) v1 is the package manager to use.

<p align="center">
<a href="https://codecov.io/gh/arcomage/arcomage-hd" title="Codecov"><img src="https://codecov.io/gh/arcomage/arcomage-hd/branch/main/graph/badge.svg?token=5rrZ38jtVr" alt="Codecov"></a>
</p>

<p align="center"><a href="https://developers.google.com/web/tools/lighthouse" title="Google Lighthouse"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/stack/lighthouse.svg" alt="Google Lighthouse" width="32px" height="32px"></a><br>Google Lighthouse score<br><a href="https://github.com/arcomage/arcomage-hd/issues/41"><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/lighthouse_score.png" alt="ArcoMage HD Google Lighthouse score"></a></p>

## Changelog & Issues

[Changelog file](CHANGELOG.md)

[Issues](https://github.com/arcomage/arcomage-hd/issues)

## Translation Credits

- [Cards](https://github.com/arcomage/arcomage-hd/tree/main/src/i18n/cards): extracted from _Might and Magic VIII_ & _VI_ original games (or translated/retranslated) by:
  - English (`en`): [Black Rabite on GameFAQs](https://gamefaqs.gamespot.com/pc/929601-arcomage/faqs/44131)
  - Russian (`ru`) (retranslated): [rayburn](https://github.com/TombOfVARN)
  - Simplified Chinese (`zh-Hans`): (extracted) [Liar-zzy](https://github.com/Liar-zzy/Arcomage/blob/master/Arcomage.cpp), (fixed/retranslated) [Tom Chen](https://github.com/tomchen)
  - Polish (`pl`) (retranslated): [acidcave](https://www.arcomage.acidcave.net/czerwone_karty.html)
  - Czech (`cs`): Yym
  - Brazilian Portuguese (`pt-BR`) (translated): [mateuscv](https://github.com/mateuscv)
  - Japanese (`ja`) (translated): [Tom Chen](https://github.com/tomchen) with the help of [Google Translate](https://translate.google.com/) & [DeepL](https://www.deepl.com/translator)
  - Ukrainian (`uk`) (translated): [troyane](https://github.com/troyane)
  - All others: [Tom Chen](https://github.com/tomchen) with OCR tool [tesseract.js](https://tesseract.projectnaptha.com/) & [other scripts](https://github.com/arcomage/arcomage-hd/tree/main/tools)
  - Traditional Chinese (`zh-Hant`): converted from `zh-Hans` by [Tom Chen](https://github.com/tomchen) with [his scripts](https://github.com/arcomage/arcomage-hd/tree/main/tools/zhconvert) using [opencc-js](https://github.com/nk2028/opencc-js)
- [Main](https://github.com/arcomage/arcomage-hd/tree/main/src/i18n/main) string translators (some are from the original games):
  - Russian (`ru`): [rayburn](https://github.com/TombOfVARN)
  - Polish (`pl`): (partially by) Plamcia
  - Brazilian Portuguese (`pt-BR`): [mateuscv](https://github.com/mateuscv)
  - Ukrainian (`uk`): [troyane](https://github.com/troyane)
  - All others: [Tom Chen](https://github.com/tomchen) by himself and/or with the help of [Google Translate](https://translate.google.com/) & [DeepL](https://www.deepl.com/translator)
  - Traditional Chinese (`zh-Hant`): converted from `zh-Hans` by [Tom Chen](https://github.com/tomchen) with [his scripts](https://github.com/arcomage/arcomage-hd/tree/main/tools/zhconvert) using [opencc-js](https://github.com/nk2028/opencc-js)
- [Taverns](https://github.com/arcomage/arcomage-hd/tree/main/src/i18n/taverns): extracted from _Might and Magic VIII_ & _VI_ original games by [Tom Chen](https://github.com/tomchen) with [his script](https://github.com/arcomage/arcomage-hd/tree/main/tools/i18n-extraction). Except for:
  - Brazilian Portuguese (`pt-BR`) (translated): [mateuscv](https://github.com/mateuscv)
  - Japanese (`ja`) (translated): [Tom Chen](https://github.com/tomchen) with the help of [Google Translate](https://translate.google.com/) & [DeepL](https://www.deepl.com/translator)
  - Ukrainian (`uk`) (translated): [troyane](https://github.com/troyane)

_See also [I18N Issue Page](https://github.com/arcomage/arcomage-hd/issues/9)_

## Arcomage original game

Arcomage was initially developed by Stickman Games and later sold to The 3DO Company (3DO). The game appeared as a mini-game in _Might and Magic VII: For Blood and Honor_ (MM7) and _Might and Magic VIII: Day of the Destroyer_ (MM8), the seventh and eighth games in New World Computing (NWC)'s _Might and Magic_ (MM) series. (It's like _Gwent_ in _The Witcher_) NWC and its parent company, 3DO, also released a stand-alone version in 2000, which can be played in single player or multi player mode. The original stand-alone Arcomage has a resolution of 800 x 600 pixels and is usable in 16-bit color mode in Windows 10, but the graphics is unstable.

## Copyright

The code of the ArcoMage HD game: MIT License (c) 2021 [Tom Chen](https://tomchen.org/).

The assets, text, appearance and other copyrightable elements of the game: (c) 2001 The 3DO Company.

See [CREDIT.md file](CREDIT.md) for a detailed presentation of the copyright status, licenses and credit of the game's components.

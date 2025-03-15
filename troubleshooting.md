# Troubleshooting for [ArcoMage HD](https://arcomage.github.io/)

## Browser Support

The game officially supports all individual versions of actively maintained desktop and mobile browsers with more than 0.2% global market share (`>0.2% and not dead`). Click "[supported browser list](https://browsersl.ist/#q=%3E0.2%25+and+not+dead)" and check if your browser is supported. Upgrade your browser if it's not supported.

<details><summary><strong>Click to show a list of browsers tested to run or not run the game in 2021 (maybe outdated)</strong></summary>

_(\*: presumed to work, but not fully tested)_

🏆 Browsers based on Chrome's engine, [Blink](https://www.chromium.org/blink), are fully supported by ArcoMage HD (as of 2021). With an average CPU / GPU, you should be able to play the game without performance issues. You don't need the Desktop Version for these browsers:

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

_(If your Chrome-based browser has performance issues, the Desktop Version (a Chrome wrapper) will not help. Check solutions in [What to do if the game is slow](https://github.com/arcomage/arcomage-hd/issues/66))_

✅ Browsers based on Firefox's [Gecko](https://hg.mozilla.org/), Safari's [WebKit](https://webkit.org/), and [Qt WebEngine](https://wiki.qt.io/QtWebEngine) rendering engines are tested and functional, but they may be slightly slower than Chrome-based browsers. This depends on your CPU / GPU. If you find these browsers slow, try the Desktop Version:

- Firefox
  - Pale Moon \*
  - SeaMonkey \*
  - K-Meleon \*
  - Tor Browser \*
  - etc.
- Safari 14+ (and/or iOS 14+) (v13- can run the game, but may not display WebP images)
- Browsers based on Qt WebEngine
  - qutebrowser
  - Falkon
  - Dooble \*
  - etc.

❌ Browsers with other rendering engines are not supported. You must switch to a Chrome-based browser or use the Desktop Version:

- Microsoft Internet Explorer (IE)
- Microsoft Edge (old version, before 2019) \*
- Opera (very old version, before 2013) \*
- Lynx \*
- NetSurf
- Links \*
- KaiOS browser \*
- etc.

❌ Very old browsers that [do not support ECMAScript 2015 (ES6)](https://caniuse.com/es6) or [WebP images](https://caniuse.com/webp) are also not supported.

</details>

## Mobile Support

The game should function properly and maintain the correct layout on all modern mobile and tablet browsers.

To ensure the correct layout, users should rotate their devices to landscape mode (where the screen's width is greater than its height).

The minimum supported screen size is 480 × 320 pixels. Devices with a width (or height in landscape mode) smaller than 320 pixels may not display the game optimally.

## Performance

ArcoMage HD performs best on Chrome and other browsers based on the Blink engine. Based on a 2021 test and user feedback, there may be performance issues on Safari and Firefox. [See browser compatibility details](#browser-list). If you encounter issues, users of Safari, Firefox, or Internet Explorer may want to consider using the [Desktop Version](#desktop-version). For performance optimization tips, check "[What to do if the game is slow](https://github.com/arcomage/arcomage-hd/issues/66)".

## Desktop Version

**If you don't experience performance or other issues playing ArcoMage HD in your browser, then you don't need the current Desktop Version.**

Some browsers, such as Firefox and Safari, which are not based on Chrome's Blink engine, may experience slight slowness while running ArcoMage HD. In this case, you can opt for the Desktop Version.

The current Desktop Version is **simply a Google Chrome browser-like wrapper** that visits the URL [https://arcomage.github.io/](https://arcomage.github.io/).

[Click to download the Desktop Version (Windows)](https://github.com/arcomage/arcomage-hd/releases/download/v1.0.0-beta.26/ArcoMage.HD.Setup.1.0.0.7z)

The first time you run the ArcoMage HD Desktop Version, it will silently download all images and sound files. Please allow about 1 minute (depending on your Internet speed) before you can disconnect from the Internet and play offline.

If both Google Chrome and the Desktop Version are installed, the Desktop Version will have its own independent storage. Clearing data in Google Chrome will not affect the Desktop Version's settings.

The current Windows Desktop Version is not expected to be updated. MacOS and Linux versions of this Electron-powered app are not planned. However, Tauri may be used to build future cross-platform and lightweight desktop and mobile apps of the game. ([issue page](https://github.com/arcomage/arcomage-hd/issues/3))

## Fullscreen Mode

Whether using the PWA or not, some mobile browsers may not remove the top and bottom bars in fullscreen mode, but this is usually configurable.

## Multiplayer Mode

If you encounter any issues related to Multiplayer Mode, please refer to the [§ Multiplayer Mode](README.md#multiplayer-mode) section in the main readme.

In rare cases, depending on network conditions and other factors, users may experience difficulties connecting to other players, even if there are no NAT issues ([issue page](https://github.com/arcomage/arcomage-hd/issues/75)). Currently, we are unable to replicate the issue, and the only suggestion is to try again later.

- [Symmetric NAT Online Test](https://tomchen.github.io/symmetric-nat-test/)
- [WebRTC P2P Chat Online Test](https://tomchen.github.io/webrtc-p2p-chat)

## Sound Lag at Game Start

If you experience a delay in sound playing when the game starts, it is likely due to:

- [Browser's autoplay policy](https://developer.chrome.com/blog/autoplay/#webaudio) allows audio to play only after a user gesture (like click) on the page.
- The sound file is not loaded yet.

## Others

If you encounter any issues, please [open an issue](https://github.com/arcomage/arcomage-hd/issues).

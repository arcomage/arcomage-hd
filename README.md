<p align="center"><a href="https://arcomage.github.io/"><img width="250" src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/logo/logo.svg" alt="ArcoMage HD logo"></a></p>

<h1 align="center">ArcoMage HD - Open Source Arcomage Clone</h1>

**ArcoMage HD** is a web-based, open source, remastered 3D clone of 3DO and New World Computing's 2000 PC card game Arcomage, which appeared in the *Might and Magic* RPG game series.

Developed by [@tomchen](https://github.com/tomchen) with TypeScript + React + Redux + redux-observable + CSS-based animations, this not-for-profit fan-remake is available in English, French, German, Simplified Chinese and Traditional Chinese.

<p align="center"><a href="https://arcomage.github.io/">Click to play it now<br><br><img src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/misc/ogimage.jpg" alt="ArcoMage HD screenshot"></a></p>

<p align="center">
<a href="https://github.com/arcomage/arcomage-hd/"><img src="https://img.shields.io/github/package-json/v/arcomage/arcomage-hd" alt="version number"></a>
<a href="https://github.com/arcomage/arcomage-hd/actions/workflows/test.yml"><img src="https://github.com/arcomage/arcomage-hd//workflows/Test/badge.svg" alt="Actions Status"></a>
<a href="https://github.com/arcomage/arcomage-hd/blob/main/LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-brightgreen" alt="License"></a>
</p>

## Gameplay

> Victory conditions vary per tavern. Build your tower, destroy your opponent's tower, or collect enough resources before your opponent does.
> 
> Large yellow numbers in column are the productions. This is how many new units of a particular resource you will receive on your next turn. Small black numbers in column are the resources. This is how many units you have available to spend on your current turn.
> 
> Cards: Each have their own cost to play, indicated in a small circle in the lower right corner of the card. The cost will be deducted from your resources according to the color of the card. Left click on a card plays the card. Right click on a card to discard without playing.
> 
> Red represents your Quarry Generator which produces your Brick resources, blue represents your Magic Generator which produces Gem resources, green represents your Dungeon generator which produces Recruit resources.

## Languages (i18n)

5 languages are fully supported, with another 5's translation in progress.

### Complete Translation

English (`en`), French (`fr`), German (`de`), Simplified Chinese (`zh-Hans`), Traditional Chinese (`zh-Hant`)

### Incomplete Translation

Spanish (`es`), Italian (`it`), Russian (`ru`), Czech (`cs`), Polish (`pl`)

### Help me translate it

<details><summary><strong>Click to show the detailed instruction on how to help me translate it</strong></summary>

I've [OCR](https://github.com/arcomage/arcomage-hd/tree/main/tools/ocr) (optical character recognition)'d the card names & descriptions in the incomplete 5 languages.

If you speak one of Spanish (`es`), Italian (`it`), Russian (`ru`), Czech (`cs`), Polish (`pl`) and want to help, please:

#### Translate General Strings

In [tools/i18n-temp](https://github.com/arcomage/arcomage-hd/tree/main/tools/i18n-temp) folder, go to "**\<LANGCODE\>.ts**" file, click <kbd>Raw</kbd> button, then <kbd>Ctrl</kbd> + <kbd>S</kbd> to save the file.

Look at [en.ts](https://github.com/arcomage/arcomage-hd/blob/main/src/i18n/en.ts) to know what the strings in English are.

Translate the untranslated lines in **\<LANGCODE\>.ts** file, by changing the string on the right. For example, change `'Your Name': 'Your Name',` to `'Your Name': 'Votre nom',`

#### Translate Card Names & Descriptions

In [tools/i18n-temp](https://github.com/arcomage/arcomage-hd/tree/main/tools/i18n-temp) folder, go to "**cards.\<LANGCODE\>.ts**" file, click <kbd>Raw</kbd> button, then <kbd>Ctrl</kbd> + <kbd>S</kbd> to save the file.

Look at [cards.en.ts](https://github.com/arcomage/arcomage-hd/blob/main/src/i18n/cards.en.ts) to know what the strings in English are.

Please also refer to [main_en_fixed.png](https://github.com/arcomage/arcomage-hd/blob/main/tools/img-processing/original/main_en_fixed.png) which is an image that includes all cards with text in English, and the same image but of your language in [tools/ocr/original](https://github.com/arcomage/arcomage-hd/tree/main/tools/ocr/original) folder.

Check and/or translate "**cards.\<LANGCODE\>.ts**" file:

```
name: '<Translated card name>',
desc: '<Translated card desciption>',
```

Now [tools/i18n-temp](https://github.com/arcomage/arcomage-hd/tree/main/tools/i18n-temp)/**cards.\<LANGCODE\>.ts** files are filled with the text I got with OCR (optical character recognition), which could be of poor quality, please delete and retranslate it if it's nonsense, or verify and modify it if it's readable.

#### Send it to me

Create a pull request if you know how to do it, or just give me the translated text on [GitHub](https://github.com/arcomage/arcomage-hd/issues/9), or on [Reddit](https://www.reddit.com/r/MightAndMagic/comments/mhfx30/arcomage_hd_i_made_a_webbased_opensource_clone_of/), or on [celestialheavens forum](https://www.celestialheavens.com/forum/10/17288), or via email.

</details>

## Keyboard Control

The game is fully controllable with keyboard. Use <kbd>Tab</kbd> to select a top-menu icon or a card, then <kbd>Enter</kbd> to open or use it, <kbd>Delete</kbd> / <kbd>Backspace</kbd> to discard a card, <kbd>Esc</kbd> to close a preferences window.

<details><summary><strong>Click to show the detailed keyboard control instruction & additional special "Access Key" usage (e.g. <kbd>Alt</kbd> + <kbd>P</kbd>: Preferences; <kbd>Alt</kbd> + <kbd>1</kbd>: use the 1st card ...)</strong></summary>

### Top Menu

Use <kbd>Tab</kbd> to select an icon, then <kbd>Enter</kbd> to open it. When the window is open, use <kbd>Esc</kbd> to close it.

Or with access key (only for opening a window):

* <kbd>Alt</kbd> + <kbd>P</kbd>: Preferences
* <kbd>Alt</kbd> + <kbd>L</kbd>: Language
* <kbd>Alt</kbd> + <kbd>V</kbd>: Volume
* <kbd>Alt</kbd> + <kbd>T</kbd>: Toggle Fullscreen
* <kbd>Alt</kbd> + <kbd>H</kbd>: Help
* <kbd>Alt</kbd> + <kbd>G</kbd>: GitHub

### Card

Use <kbd>Tab</kbd> to select a card, then <kbd>Enter</kbd> to **use** it, or <kbd>Delete</kbd> / <kbd>Backspace</kbd> to **discard** it.

Or with access key (only for using a card):

* <kbd>Alt</kbd> + <kbd>1</kbd>: Use the 1st card
* <kbd>Alt</kbd> + <kbd>2</kbd>: Use the 2nd card
* <kbd>Alt</kbd> + <kbd>3</kbd>: Use the 3rd card
* <kbd>Alt</kbd> + ...: Use the nth card (n <= 9, you can't use 10th or later card with access key)

It could be other key instead of <kbd>Alt</kbd>

[The way to activate the accesskey depends on the browser and its platform](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey), it's "<kbd>Alt</kbd> + key" in Chrome Windows/Linux.

</details>

## Development

The stack:

<p align="center">
<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/typescript-icon.svg" alt="Typescript" width="21px" height="21px"></a>
<a href="https://reactjs.org/" title="React"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/react.svg" alt="React" width="21px" height="21px"></a>
<a href="https://redux.js.org/" title="Redux"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/redux.svg" alt="Redux" width="21px" height="21px"></a>
<a href="https://github.com/redux-observable/redux-observable" title="redux-observable"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/redux-observable.svg" alt="redux-observable" width="21px" height="21px"></a>
<a href="https://rxjs-dev.firebaseapp.com/" title="RxJS (ReactiveX)"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/reactivex.svg" alt="RxJS (ReactiveX)" width="21px" height="21px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/javascript.svg" alt="JavaScript" width="21px" height="21px"></a>
<a href="https://tc39.es/ecma262/" title="ECMAScript 6+"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/es6.svg" alt="ECMAScript 6+" width="21px" height="21px"></a>
<a href="https://sass-lang.com/" title="Sass"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/sass.svg" alt="Sass" width="21px" height="21px"></a>
<a href="https://tailwindcss.com/" title="Tailwind CSS"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/tailwindcss-icon.svg" alt="Tailwind CSS" width="21px" height="21px"></a>
<a href="https://webpack.js.org/" title="webpack"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/webpack.svg" alt="webpack" width="21px" height="21px"></a>
<a href="https://jestjs.io/" title="Jest"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/jest.svg" alt="Jest" width="21px" height="21px"></a>
<a href="https://cssinjs.org/" title="JSS"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/jss.svg" alt="JSS" width="21px" height="21px"></a>
<a href="https://prettier.io/" title="Prettier"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/prettier.svg" alt="Prettier" width="21px" height="21px"></a>
<a href="https://eslint.org/" title="ESLint"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/eslint.svg" alt="ESLint" width="21px" height="21px"></a>
<a href="https://github.com/postcss/postcss" title="PostCSS"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/postcss.svg" alt="PostCSS" width="21px" height="21px"></a>
<a href="https://github.com/postcss/autoprefixer" title="Autoprefixer"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/autoprefixer.svg" alt="Autoprefixer" width="21px" height="21px"></a>
<a href="https://code.visualstudio.com/" title="Visual Studio Code"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/visual-studio-code.svg" alt="Visual Studio Code" width="21px" height="21px"></a>
<a href="https://yarnpkg.com/" title="yarn v1"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/yarn.svg" alt="yarn v1" width="21px" height="21px"></a>
<a href="https://inkscape.org/" title="Inkscape"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Inkscape_Logo.svg" alt="Inkscape" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/illustrator.html" title="Adobe Illustrator"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/adobe-illustrator.svg" alt="Adobe Illustrator" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/photoshop.html" title="Adobe Photoshop"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/adobe-photoshop.svg" alt="Adobe Photoshop" width="21px" height="21px"></a>
</p>

TypeScript + React + Redux + redux-observable, CSS-based animations without \<canvas\>.

## To Do

[To-do list](https://github.com/arcomage/arcomage-hd/projects/1)

## Arcomage original game

Arcomage was initially developed by Stickman Games and later sold to The 3DO Company (3DO). The game appeared as a mini-game in *Might and Magic VII: For Blood and Honor* (MM7) and *Might and Magic VIII: Day of the Destroyer* (MM8), the seventh and eighth games in New World Computing (NWC)'s *Might and Magic* (MM) series. NWC and its parent company, 3DO, also released a stand-alone version in 2000, which can be played in single player or multi player mode. The original stand-alone Arcomage has a resolution of 800 x 600 pixels and is usable in 16-bit color mode in Windows 10, but the graphics is unstable.

## Copyright

The code of the ArcoMage HD game: MIT License (c) 2021 [Tom Chen](https://github.com/tomchen).

The assets, text, appearance and other copyrightable elements of the game: (c) 2001 The 3DO Company.

See [LICENSE.md file](LICENSE.md) for a detailed presentation of the copyright status of the game's components.

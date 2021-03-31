<p align="center"><a href="https://arcomage.github.io/" target="_blank" rel="noopener noreferrer"><img width="250" src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/logo/logo.svg" alt="ArcoMage HD logo"></a></p>

<h1 align="center">ArcoMage HD - Open Source Arcomage Clone</h1>

ArcoMage HD is a web-based open source HD clone of 3DO and New World Computing's 2000 PC card game Arcomage, which appeared in the *Might and Magic* RPG game series.

<p align="center"><a href="https://arcomage.github.io/" target="_blank" rel="noopener noreferrer">Click to play it now<br><br><img width="700" src="https://raw.githubusercontent.com/arcomage/arcomage-hd/main/assets/misc/ogimage.jpg" alt="ArcoMage HD screenshot"></a></p>

<p align="center">
  <a href="https://github.com/arcomage/arcomage-hd/"><img src="https://img.shields.io/github/package-json/v/arcomage/arcomage-hd" alt="version number"></a>
  <a href="https://github.com/arcomage/arcomage-hd//actions"><img src="https://github.com/arcomage/arcomage-hd//workflows/Test/badge.svg" alt="Actions Status"></a>
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



## Keyboard Control

The game is fully controllable with keyboard.

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

* <kbd>Alt</kbd> + <kbd>1</kbd>: use 1st card
* <kbd>Alt</kbd> + <kbd>2</kbd>: use 2nd card
* <kbd>Alt</kbd> + <kbd>3</kbd>: use 3rd card
* <kbd>Alt</kbd> + ...: use nth card

It could be other key instead of <kbd>Alt</kbd>

[The way to activate the accesskey depends on the browser and its platform](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey), it's "<kbd>Alt</kbd> + key" in Chrome Windows/Linux.

## Development

The stack:

<p align="center">
<a href="https://www.typescriptlang.org/" title="Typescript"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/typescript-icon.svg" alt="Typescript" width="21px" height="21px"></a>
<a href="https://reactjs.org/" title="React"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/react.svg" alt="React" width="21px" height="21px"></a>
<a href="https://redux.js.org/" title="Redux"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/redux.svg" alt="Redux" width="21px" height="21px"></a>
<a href="https://github.com/redux-observable/redux-observable" title="redux-observable"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/redux-observable.svg" alt="redux-observable" width="21px" height="21px"></a>
<a href="https://reactivex.io/" title="ReactiveX (RxJS)"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/reactivex.svg" alt="ReactiveX (RxJS)" width="21px" height="21px"></a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" title="JavaScript"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/javascript.svg" alt="JavaScript" width="21px" height="21px"></a>
<a href="https://tc39.es/ecma262/" title="ECMAScript 6"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/es6.svg" alt="ECMAScript 6" width="21px" height="21px"></a>
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
<a href="https://yarnpkg.com/" title="Yarn"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/yarn.svg" alt="Yarn" width="21px" height="21px"></a>
<a href="https://inkscape.org/" title="Inkscape"><img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Inkscape_Logo.svg" alt="Inkscape" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/photoshop.html" title="Adobe Photoshop"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/adobe-photoshop.svg" alt="Adobe Photoshop" width="21px" height="21px"></a>
<a href="https://www.adobe.com/products/illustrator.html" title="Adobe Illustrator"><img src="https://github.com/tomchen/stack-icons/raw/master/logos/adobe-illustrator.svg" alt="Adobe Illustrator" width="21px" height="21px"></a>
</p>

## To Do

I'll write a detailed to-do list [here](https://github.com/arcomage/arcomage-hd/projects/1).

## Arcomage original game

Arcomage was initially developed by Stickman Games and later sold to The 3DO Company (3DO). The game appeared as a mini-game in *Might and Magic VII: For Blood and Honor* (MM7) and *Might and Magic VIII: Day of the Destroyer* (MM8), the seventh and eighth games in New World Computing (NWC)'s *Might and Magic* (MM) series. NWC and its parent company, 3DO, also released a stand-alone version in 2000, which can be played in single player or multi player mode.

## Copyright

The code of the ArcoMage HD game: MIT License (c) 2021 Tom Chen.

The assets, text, appearance and other copyrightable elements of the game: (c) 2001 The 3DO Company.

See LICENSE.md for details.

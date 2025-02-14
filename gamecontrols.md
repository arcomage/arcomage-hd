# [Mouse](#mouse), [Touch Device](#touch-device), [Keyboard](#keyboard), and [Gamepad](#gamepad) Controls for [ArcoMage HD](https://arcomage.github.io/)

## Mouse

| 🖱️ Button or Action      | Function                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| Left click               | Use card, click button, toggle checkbox, etc.                                            |
| Right click              | Discard card                                                                             |
| Wheel up/down            | Increase/decrease number when hovering over number input element in preferences settings |
| Hover over some elements | Display tooltip                                                                          |

## Touch Device

| 📱 Action  | Function                                        |
| ---------- | ----------------------------------------------- |
| Press      | Use card, click button, toggle checkbox, etc.   |
| Long press | Discard card, display tooltip for some elements |

## Keyboard

<small>(_Italic text indicates keyboard keys supported natively by browser._ Support for others are added by ArcoMage HD.)</small>

### General Keys

| ⌨️ Key                                                                   | Function                                                                                                |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| _<kbd>Enter</kbd> / <kbd>Space</kbd>_                                    | _Use card, click button, etc._                                                                          |
| <kbd>Delete</kbd> / <kbd>Backspace</kbd>                                 | Discard card                                                                                            |
| _<kbd>Shift</kbd> + <kbd>Tab</kbd>_                                      | _Select the previous card, button, or other clickable element_                                          |
| _<kbd>Tab</kbd> (or <kbd>Option (Alt)</kbd> + <kbd>Tab</kbd> in Safari)_ | _Select the next card, button, or other clickable element_                                              |
| <kbd>←</kbd>                                                             | Select the previous card or top-bar button, can only use when no window (settings) is open              |
| <kbd>→</kbd>                                                             | Select the next card or top-bar button, can only use when no window (settings) is open                  |
| <kbd>↑</kbd>                                                             | Select the first top-bar button, can only use when no window (settings) is open                         |
| <kbd>↓</kbd>                                                             | Select the first card, can only use when no window (settings) is open                                   |
| <kbd>Esc</kbd>                                                           | _Exit current window (with fullscreen mode disabled)_, or exit fullscreen mode (if the mode is enabled) |

### Form Element

In settings window, when a form element / input element is selected, you can use widely known keys like _<kbd>Delete</kbd>_, _<kbd>Backspace</kbd>_, _<kbd>←</kbd>_, _<kbd>→</kbd>_. The following keys are also supported:

| ⌨️ Key                                | Function          | Element Type |
| ------------------------------------- | ----------------- | ------------ |
| <kbd>Enter</kbd> / _<kbd>Space</kbd>_ | Toggle checkbox   | Checkbox     |
| <kbd>↑</kbd> / <kbd>↓</kbd>           | Increase/decrease | Number input |
| _<kbd>→</kbd> / <kbd>↑</kbd>_         | _Increase_        | Range input  |
| _<kbd>←</kbd> / <kbd>↓</kbd>_         | _Decrease_        | Range input  |

### Access Keys

[The way to activate the accesskey depends on the browser and its platform](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey), it's "<kbd>Alt</kbd> + key" in Chrome Windows/Linux, it could be other key instead of <kbd>Alt</kbd> in other browsers.

| ⌨️ Key                                         | Function                                                                                                                                                                         |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>Alt</kbd> + <kbd>1</kbd> ... <kbd>9</kbd> | Use the **1**st ... **9**th card. If unusable, then select this card. 1 ≤ n ≤ 9, you can't use the 10th or later cards with access key                                           |
| <kbd>Alt</kbd> + <kbd>P</kbd>                  | Open **P**references                                                                                                                                                             |
| <kbd>Alt</kbd> + <kbd>L</kbd>                  | Open **L**anguage                                                                                                                                                                |
| <kbd>Alt</kbd> + <kbd>S</kbd>                  | Open **S**ound & Graphics                                                                                                                                                        |
| <kbd>Alt</kbd> + <kbd>F</kbd>                  | Toggle **F**ullscreen                                                                                                                                                            |
| <kbd>Alt</kbd> + <kbd>H</kbd>                  | Open **H**elp                                                                                                                                                                    |
| <kbd>Alt</kbd> + <kbd>G</kbd>                  | Open **G**itHub                                                                                                                                                                  |
| <kbd>Alt</kbd> + <kbd>X</kbd>                  | E**x**it current window                                                                                                                                                          |
| <kbd>Alt</kbd> + <kbd>A</kbd>                  | **A**pply & New Game (in Preferences)                                                                                                                                            |
| <kbd>Alt</kbd> + <kbd>R</kbd>                  | **R**eset settings (in Preferences / Sound & Graphics)                                                                                                                           |
| <kbd>Alt</kbd> + <kbd>O</kbd>                  | Restore **o**riginal visual settings. This can be used anywhere—if you accidentally set the game's visuals too dark to see anything, press this hotkey combination to reset them |
| <kbd>Alt</kbd> + <kbd>c</kbd>                  | Review/hide **c**ards in game end screen                                                                                                                                         |

## Gamepad

| 🎮 Button (Xbox)                | 🎮 Button (PlayStation)              | Function                                                                                                                                      |
| ------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| <kbd>A</kbd>                    | <kbd>✕</kbd>                         | Use card, click button, toggle checkbox, etc.                                                                                                 |
| <kbd>B</kbd>                    | <kbd>◯</kbd>                         | Discard card, exit current window                                                                                                             |
| <kbd>X</kbd>                    | <kbd>▢</kbd>                         | Select the previous card                                                                                                                      |
| <kbd>Y</kbd>                    | <kbd>△</kbd>                         | Select the next card                                                                                                                          |
| <kbd>Left Bumper (LB)</kbd>     | <kbd>L1</kbd>                        | Select the previous card, button, or other clickable element                                                                                  |
| <kbd>Right Bumper (RB)</kbd>    | <kbd>R1</kbd>                        | Select the next card, button, or other clickable element                                                                                      |
| <kbd>Left Trigger (LT)</kbd>    | <kbd>L2</kbd>                        | Not yet implemented <del>(During virtual keyboard mode ⌨️) Select the previous key (button) in the virtual keyboard</del>                     |
| <kbd>Right Trigger (RT)</kbd>   | <kbd>R2</kbd>                        | Not yet implemented <del>(During virtual keyboard mode ⌨️) Select the next key (button) in the virtual keyboard</del>                         |
| <kbd>Start</kbd>                | <kbd>Options</kbd>                   | Open Preferences                                                                                                                              |
| <kbd>Back</kbd>                 | <kbd>Share</kbd> / <kbd>Select</kbd> | Not yet implemented <del>Exit hand cursor 👆 mode</del>                                                                                       |
| <kbd>Left Stick 🕹</kbd>        | Same as Xbox                         | Not yet implemented <del>Show and move a hand cursor 👆</del>                                                                                 |
| <kbd>Right Stick 🕹</kbd>       | Same as Xbox                         | Not yet implemented <del>Show and move a hand cursor 👆 (fast movement)</del>                                                                 |
| <kbd>Left Stick 🕹 Click</kbd>  | Same as Xbox                         | Not yet implemented <del>Hand cursor 👆 left click</del>                                                                                      |
| <kbd>Right Stick 🕹 Click</kbd> | Same as Xbox                         | Not yet implemented <del>Hand cursor 👆 right click</del>                                                                                     |
| <kbd>D-Pad Up 🔼</kbd>          | Same as Xbox                         | Select the previous card or top-bar button when no window (settings) is open, or <kbd>↑</kbd> in Text / Number / Range inputs / Option Select |
| <kbd>D-Pad Down 🔽</kbd>        | Same as Xbox                         | Select the next card or top-bar button when no window (settings) is open, or <kbd>↓</kbd> in Text / Number / Range inputs / Option Select     |
| <kbd>D-Pad Left ◀️</kbd>        | Same as Xbox                         | Select the first top-bar button when no window (settings) is open, or <kbd>←</kbd> in Text / Number / Range inputs / Option Select            |
| <kbd>D-Pad Right ▶️</kbd>       | Same as Xbox                         | Select the first card when no window (settings) is open, or <kbd>→</kbd> in Text / Number / Range inputs / Option Select                      |
| <kbd>Guide (Xbox)</kbd>         | <kbd>PS</kbd>                        | Not yet implemented <del>Show/hide virtual keyboard ⌨️ when focused on Text/Number inputs</del>                                               |

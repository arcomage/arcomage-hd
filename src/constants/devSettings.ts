const _disableContextMenu = false
const _enableWindowUnloadWarning = false
const _hideOpponentCard = true
const _shouldUseAi = true
const _noAiExtraDelay = true
const _noLatency = false
const _noDevLog = false

export const isProd = import.meta.env.MODE === 'production'
export const appVersion: string = import.meta.env.APP_VERSION ?? ''

export const disableContextMenu = isProd || _disableContextMenu
export const enableWindowUnloadWarning = isProd || _enableWindowUnloadWarning
export const hideOpponentCard = isProd || _hideOpponentCard
export const shouldUseAi = isProd || _shouldUseAi
export const noAiExtraDelay = isProd || _noAiExtraDelay
export const noLatency = isProd || _noLatency
export const noDevLog = isProd || _noDevLog
// the above should all be `true` for prod version

// in multiplayer connected mode, shouldUseAi acts like always false

// if shouldUseAi is true, even when opponent cards are shown, they are unclickable

export const aiExtraDelay = 4000

// can discard "undiscardable" cards during the discard mode triggered by "draw discard playagain" cards
export const canDiscardUndiscardableWhenDDP = false

export const testLatency: [number, number] = [300, 6000]

export const githubUrl = 'https://github.com/arcomage/arcomage-hd'
export const authorUrl = 'https://github.com/tomchen'
export const tutorialImageUrl =
  'https://raw.githubusercontent.com/arcomage/arcomage-hd/main/misc/readme_images/manual.jpg'

export const localstorageName = 'arcomagehdls'
export const localstorageVersionName = 'arcomagehdls_ver'
export const localstorageMinVer = '2.0.0'

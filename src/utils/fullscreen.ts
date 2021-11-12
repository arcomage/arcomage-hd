// Fullscreen lib
// from: https://github.com/sindresorhus/screenfull/blob/main/index.js
// by sindresorhus, MIT License
// modified by Tom Chen for ArcoMage HD, MIT License

const methodMap = [
  [
    'requestFullscreen',
    'exitFullscreen',
    'fullscreenElement',
    'fullscreenEnabled',
    // 'fullscreenchange',
    // 'fullscreenerror',
  ],
  // New WebKit
  [
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitFullscreenElement',
    'webkitFullscreenEnabled',
    // 'webkitfullscreenchange',
    // 'webkitfullscreenerror',
  ],
  // Old WebKit
  [
    'webkitRequestFullScreen',
    'webkitCancelFullScreen',
    'webkitCurrentFullScreenElement',
    'webkitCancelFullScreen',
    // 'webkitfullscreenchange',
    // 'webkitfullscreenerror',
  ],
  [
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozFullScreenElement',
    'mozFullScreenEnabled',
    // 'mozfullscreenchange',
    // 'mozfullscreenerror',
  ],
  [
    'msRequestFullscreen',
    'msExitFullscreen',
    'msFullscreenElement',
    'msFullscreenEnabled',
    // 'MSFullscreenChange',
    // 'MSFullscreenError',
  ],
]

const nativeAPI: Record<string, string> | null = (() => {
  const unprefixedMethods = methodMap[0]
  for (const methodList of methodMap) {
    const exitFullscreenMethod = methodList?.[1]
    if (exitFullscreenMethod in document) {
      return unprefixedMethods.reduce(
        (obj, k, i) => ({ ...obj, [k]: methodList[i] }),
        {},
      )
    }
  }
  return null
})()

const requestFullscreen = nativeAPI?.requestFullscreen
const exitFullscreen = nativeAPI?.exitFullscreen
const fullscreenElement = nativeAPI?.fullscreenElement
const fullscreenEnabled = nativeAPI?.fullscreenEnabled
// const fullscreenchange = nativeAPI?.fullscreenchange
// const fullscreenerror = nativeAPI?.fullscreenerror

export const isEnabled: boolean = fullscreenEnabled
  ? (document as Record<string, any>)[fullscreenEnabled]
  : false

export const isFullscreen = (): boolean =>
  fullscreenElement
    ? (document as Record<string, any>)[fullscreenElement]
    : false

export const requestFs = () => {
  if (requestFullscreen) {
    ;(document.documentElement as Record<string, any>)[requestFullscreen]()
  }
}

export const exitFs = () => {
  if (exitFullscreen) {
    ;(document as Record<string, any>)[exitFullscreen]()
  }
}

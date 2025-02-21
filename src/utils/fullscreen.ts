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

/* prettier-ignore */ const requestFullscreenString = nativeAPI?.requestFullscreen as 'requestFullscreen' | undefined
/* prettier-ignore */ const exitFullscreenString    = nativeAPI?.exitFullscreen    as 'exitFullscreen'    | undefined
/* prettier-ignore */ const fullscreenElementString = nativeAPI?.fullscreenElement as 'fullscreenElement' | undefined
/* prettier-ignore */ const fullscreenEnabledString = nativeAPI?.fullscreenEnabled as 'fullscreenEnabled' | undefined
/* prettier-ignore */ // const fullscreenchange        = nativeAPI?.fullscreenchange  as 'fullscreenchange'  | undefined
/* prettier-ignore */ // const fullscreenerror         = nativeAPI?.fullscreenerror   as 'fullscreenerror'   | undefined

export const isEnabled: boolean = fullscreenEnabledString
  ? document[fullscreenEnabledString]
  : false

export const isFullscreen = (): boolean =>
  fullscreenElementString ? !!document[fullscreenElementString] : false

export const requestFs = () => {
  if (requestFullscreenString) {
    document.documentElement[requestFullscreenString]()
  }
}

export const exitFs = () => {
  if (exitFullscreenString) {
    document[exitFullscreenString]()
  }
}

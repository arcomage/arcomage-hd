export const enableFullscreen = () => {
  document.documentElement.requestFullscreen()
}

export const disableFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}

export const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    enableFullscreen()
  } else {
    disableFullscreen()
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('Service worker (PWA) registered: ', registration)
      })
      .catch((registrationError) => {
        console.log(
          'Service worker (PWA) registration failed: ',
          registrationError,
        )
      })
  })
}

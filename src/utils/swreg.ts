import { isProd } from '../constants/devSettings'
import { beforeWindowUnloadFn } from './hooks/useBeforeWindowUnloadWarning'

function updateApp(registration: ServiceWorkerRegistration) {
  if (confirm('A new version is available. Reload now?')) {
    window.removeEventListener('beforeunload', beforeWindowUnloadFn)
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }
}

if ('serviceWorker' in navigator && isProd) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration)

        if (registration.waiting) {
          updateApp(registration)
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                updateApp(registration)
              }
            })
          }
        })
      })
  })
}

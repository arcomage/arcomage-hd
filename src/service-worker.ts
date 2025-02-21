/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope

import { skipWaiting, clientsClaim, cacheNames } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'

skipWaiting()
clientsClaim()

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    caches.keys().then((cacheList) =>
      Promise.all(
        cacheList.map((cacheName) => {
          if (
            cacheName !== cacheNames.runtime &&
            cacheName !== cacheNames.precache
          ) {
            return caches.delete(cacheName)
          }
          return Promise.resolve()
        }),
      ),
    ),
  )
})

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp3'),
  new StaleWhileRevalidate({
    cacheName: cacheNames.runtime,
    plugins: [new RangeRequestsPlugin()],
  }),
)

precacheAndRoute(self.__WB_MANIFEST)

declare let self: ServiceWorkerGlobalScope

import { skipWaiting, clientsClaim } from 'workbox-core'
import { RangeRequestsPlugin } from 'workbox-range-requests'
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { registerRoute, setDefaultHandler } from 'workbox-routing'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

skipWaiting()
clientsClaim()

const WB_MANIFEST = self.__WB_MANIFEST

precacheAndRoute(WB_MANIFEST)

cleanupOutdatedCaches()

registerRoute(
  '/',
  new StaleWhileRevalidate({
    cacheName: 'start-url',
  }),
  'GET',
)

registerRoute(
  /.*\.(?:jpg|jpeg|gif|png|svg|ico|webp)/i,
  new CacheFirst({
    cacheName: 'image',
  }),
  'GET',
)

registerRoute(
  /.*\.(?:mp3|wav|ogg)/i,
  new CacheFirst({
    cacheName: 'audio',
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new RangeRequestsPlugin(),
    ],
  }),
  'GET',
)

registerRoute(
  /.*/i,
  new StaleWhileRevalidate({
    cacheName: 'others',
  }),
  'GET',
)

setDefaultHandler(new StaleWhileRevalidate({}))

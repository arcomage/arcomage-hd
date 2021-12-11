declare let self: ServiceWorkerGlobalScope & Window & typeof globalThis

/* eslint-disable import/no-extraneous-dependencies */
import { skipWaiting, clientsClaim, cacheNames } from 'workbox-core'
import { precacheAndRoute, getCacheKeyForURL } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate } from 'workbox-strategies'
import { RangeRequestsPlugin } from 'workbox-range-requests'

skipWaiting()
clientsClaim()

const cacheKeyWillBeUsed: any = ({ request }: { request: any }) =>
  getCacheKeyForURL(request.url)

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp3'),
  new StaleWhileRevalidate({
    cacheName: cacheNames.precache,
    plugins: [{ cacheKeyWillBeUsed }, new RangeRequestsPlugin()],
  }),
)

precacheAndRoute(self.__WB_MANIFEST)

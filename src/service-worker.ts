declare let self: ServiceWorkerGlobalScope & Window & typeof globalThis

import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import partition from './utils/partition'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { RangeRequestsPlugin } from 'workbox-range-requests'

skipWaiting()
clientsClaim()

registerRoute(
  ({ url }) => url.pathname.endsWith('.mp3'),
  new CacheFirst({
    cacheName: 'audio-cache',
    matchOptions: { ignoreSearch: true },
    plugins: [
      new CacheableResponsePlugin({ statuses: [200] }),
      new RangeRequestsPlugin(),
    ],
  }),
)

type entryType = typeof self.__WB_MANIFEST[0]

const [mp3s, nonMp3s]: [entryType[], entryType[]] = partition(
  self.__WB_MANIFEST,
  (entry: entryType) => {
    if (typeof entry !== 'string') {
      return entry.url.endsWith('.mp3')
    }
    return false
  },
)

precacheAndRoute(nonMp3s)

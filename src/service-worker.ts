declare let self: ServiceWorkerGlobalScope & Window & typeof globalThis

import { skipWaiting, clientsClaim } from 'workbox-core'
import { precacheAndRoute } from 'workbox-precaching'
import partition from './utils/partition'

skipWaiting()
clientsClaim()

type entryType = typeof self.__WB_MANIFEST[0]

const [mp3s, otherFiles]: [entryType[], entryType[]] = partition(
  self.__WB_MANIFEST,
  (entry: entryType) => {
    if (typeof entry !== 'string') {
      return entry.url.endsWith('.mp3')
    }
    return false
  },
)

precacheAndRoute(otherFiles)

self.addEventListener('install', (event: any) => {
  const cacheVideos = async () => {
    const cache = await caches.open('audio')
    mp3s.forEach(async (mp3) => {
      if (typeof mp3 !== 'string') {
        await cache.add(mp3.url)
      }
    })
  }
  event.waitUntil(cacheVideos())
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import license from 'rollup-plugin-license'
import legacy from '@vitejs/plugin-legacy'
import vitePluginRunScript from './tools/vite-plugin-run-script'
import htmlMinifier from 'vite-plugin-html-minifier'
import pkg from './package.json'
import fs from 'fs'
import crypto from 'crypto'
import childProcess from 'child_process'
import { defaultAppUrl, origDesc, origTitle } from './src/constants/htmlVars'
import genManifestAndIcons from './tools/manifest'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development'

const commitTimeDateObj = new Date(
  parseInt(
    childProcess
      .execSync('git log -1 --date=unix --format="%ad"')
      .toString()
      .trim(),
  ) * 1000,
)
const commitTime = commitTimeDateObj.toUTCString()
const commitTime2 = commitTimeDateObj.toISOString().replace(/\.\d+Z$/, '+00:00')

const ogimageHash = (() => {
  const fileBuffer = fs.readFileSync('./assets/logo/ogimage.jpg')
  const hashSum = crypto.createHash('sha1')
  hashSum.update(fileBuffer)
  return hashSum.digest('hex').substring(0, 20)
})()

const ReactCompilerConfig = {
  target: '19',
}

const homeUrl = process.env.APP_URL || defaultAppUrl

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'assets'),
      '@root': path.resolve(__dirname),
    },
  },
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(pkg.version),
    'import.meta.env.APP_TITLE': JSON.stringify(origTitle),
    'import.meta.env.APP_URL': JSON.stringify(homeUrl),
    'import.meta.env.APP_FAVICONSVG': JSON.stringify(
      isDev ? './favicon.svg' : `${homeUrl}favicon.svg`,
    ),
    'import.meta.env.APP_FAVICONICO': JSON.stringify(
      isDev ? './favicon.ico' : `${homeUrl}favicon.ico`,
    ),
    'import.meta.env.APP_OGIMAGE': JSON.stringify(
      isDev ? './ogimage.jpg' : `${homeUrl}ogimage.jpg?${ogimageHash}`,
    ),
    'import.meta.env.APP_DESCRIPTION': JSON.stringify(origDesc),
    'import.meta.env.APP_COMMITTIME': JSON.stringify(commitTime),
    'import.meta.env.APP_COMMITTIME2': JSON.stringify(commitTime2),
  },
  plugins: [
    vitePluginRunScript({
      scripts: ['bun tools/sass-var-gen'],
      before: 'both',
    }),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    VitePWA({
      manifest: genManifestAndIcons(),
      registerType: 'autoUpdate',
      includeAssets: [
        '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,mp3,woff,woff2,ttf,otf}',
      ],
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,mp3,woff,woff2,ttf,otf}',
        ],
        globIgnores: ['**/sw.js', '**/workbox-*.js'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst', // Always check for updates, but cache for offline
            options: {
              cacheName: 'html-cache',
              networkTimeoutSeconds: 5, // If the network is slow, use cached version
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              ['script', 'style', 'worker'].includes(request.destination),
            handler: 'StaleWhileRevalidate', // Load from cache, but update in background
            options: {
              cacheName: 'assets-cache',
              expiration: {
                maxEntries: 300,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Always use cache unless expired
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'audio',
            handler: 'CacheFirst', // Load from cache first for instant playback
            options: {
              cacheName: 'audio-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
              },
            },
          },
          // {
          //   urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
          //   handler: 'NetworkFirst', // Use fresh data when possible, but cache offline
          //   options: {
          //     cacheName: 'api-cache',
          //     networkTimeoutSeconds: 3,
          //     expiration: {
          //       maxEntries: 300,
          //       maxAgeSeconds: 60 * 60 * 24, // 1 day
          //     },
          //   },
          // },
        ],
        maximumFileSizeToCacheInBytes: 100000000, // 100 MB
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
    license({
      thirdParty: {
        output: 'dist/LICENSES.txt',
      },
    }),
    legacy({
      modernPolyfills: true,
      renderLegacyChunks: false,
      modernTargets: pkg.browserslist.production,
    }),
    htmlMinifier({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
      },
    }),
  ],
  server: {
    port: 8080,
    open: true,
  },
  build: {
    target: 'es2017',
    outDir: 'dist',
    minify: 'terser',
    assetsInlineLimit: 0,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0]
          }
        },
      },
    },
  },
})

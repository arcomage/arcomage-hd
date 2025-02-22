import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'
import fs from 'fs'
import crypto from 'crypto'
import childProcess from 'child_process'
import { defaultAppUrl, origDesc, origTitle } from './src/constants/htmlVars'

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
  const fileBuffer = fs.readFileSync('./assets/misc/ogimage.jpg')
  const hashSum = crypto.createHash('sha1')
  hashSum.update(fileBuffer)
  return hashSum.digest('hex').substring(0, 20)
})()

const ReactCompilerConfig = {
  target: '19',
}

const homeUrl = process.env.APP_URL || defaultAppUrl

export default defineConfig({
  define: {
    'import.meta.env.APP_VERSION': JSON.stringify(pkg.version),
    'import.meta.env.APP_TITLE': JSON.stringify(origTitle),
    'import.meta.env.APP_URL': JSON.stringify(homeUrl),
    'import.meta.env.APP_PWAMANIFESTJSON': JSON.stringify(
      isDev ? './manifest.json' : `${homeUrl}manifest.json`,
    ),
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
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
  ],
  server: {
    port: 8080,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
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

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from './package.json'

const ReactCompilerConfig = {
  target: '19',
}

export default defineConfig({
  envPrefix: 'VITE_',
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(pkg.version),
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
  },
})

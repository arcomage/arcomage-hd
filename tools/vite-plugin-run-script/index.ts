import { execSync } from 'child_process'
import type { Plugin } from 'vite'

type RunBefore = 'dev' | 'build' | 'both'

interface VitePluginRunScriptOptions {
  scripts: string | string[]
  before?: RunBefore
}

/**
 * Vite plugin to run scripts before dev, build, or both.
 * @param {VitePluginRunScriptOptions} options - Plugin options
 * @returns {Plugin}
 */
function vitePluginRunScript({
  scripts,
  before = 'both',
}: VitePluginRunScriptOptions): Plugin {
  let isDev = false // Track if running in dev mode

  const runScripts = (command: RunBefore) => {
    // console.log(`[vite-plugin-run-script] command: ${command}`)
    // console.log(`[vite-plugin-run-script] before: ${before}`)
    if (before === 'both' || before === command) {
      const scriptList = Array.isArray(scripts) ? scripts : [scripts]
      scriptList.forEach((script) => {
        console.log(`[vite-plugin-run-script] Running: ${script}`)
        execSync(`${script}`, { stdio: 'inherit' })
      })
    }
  }

  return {
    name: 'vite-plugin-run-script',
    configResolved(config) {
      if (config.command === 'serve') {
        isDev = true
        // console.log('[vite-plugin-run-script] Running in dev mode')
        runScripts('dev')
      }
    },
    buildStart() {
      if (isDev) {
        return
      }
      // console.log('[vite-plugin-run-script] Running in build mode')
      runScripts('build')
    },
  }
}

export default vitePluginRunScript

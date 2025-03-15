import * as fs from 'fs'
import * as path from 'path'

async function copyRecursive(src: string, dest: string): Promise<void> {
  const stats = fs.statSync(src)
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    const entries = fs.readdirSync(src)
    for (const entry of entries) {
      await copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}

async function removeDir(dir: string): Promise<void> {
  if (fs.existsSync(dir)) {
    const entries = fs.readdirSync(dir)
    for (const entry of entries) {
      const entryPath = path.join(dir, entry)
      const stats = fs.statSync(entryPath)
      if (stats.isDirectory()) {
        await removeDir(entryPath)
      } else {
        fs.unlinkSync(entryPath)
      }
    }
    fs.rmdirSync(dir)
  }
}

async function cleanup() {
  const sourceDir = path.join(__dirname, '3_final')
  const targetDir = path.join(__dirname, '../../assets/img')
  const dirsToRemove = [
    path.join(__dirname, '1_after_crop'),
    path.join(__dirname, '2_after_upscale'),
    path.join(__dirname, '3_final'),
  ]

  try {
    console.log('Copying files from 3_final to assets/img...')
    await copyRecursive(sourceDir, targetDir)
    console.log('Files copied successfully!')

    console.log('Removing temporary directories...')
    for (const dir of dirsToRemove) {
      await removeDir(dir)
      console.log(`Removed ${path.basename(dir)}`)
    }

    console.log('Cleanup completed successfully!')
  } catch (error) {
    console.error('Error during cleanup:', error)
    process.exit(1)
  }
}

cleanup()

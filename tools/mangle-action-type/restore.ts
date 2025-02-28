import fs from 'fs'
import path from 'path'

/**
 * Restores a file from its backup (`.bak`), overwriting the original file.
 * @param filePath The path of the original file to restore.
 */
function restoreFile(filePath: string): void {
  const backupPath = `${filePath}.bak`
  if (!fs.existsSync(backupPath)) {
    console.error(`Error: Backup "${backupPath}" does not exist.`)
    return
  }
  fs.copyFileSync(backupPath, filePath)
  console.log(`File restored from backup: ${filePath}`)
  fs.unlinkSync(backupPath)
  console.log(`Backup deleted: ${backupPath}`)
}

const fileRelativePath = '../../src/constants/ActionTypes.ts'
const filePath = path.join(__dirname, fileRelativePath)

restoreFile(filePath)

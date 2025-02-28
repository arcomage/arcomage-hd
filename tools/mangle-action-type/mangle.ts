import fs from 'fs'
import path from 'path'

class AlphaNumericIterator {
  private chars: string
  private indexes: number[]
  constructor() {
    this.chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    this.indexes = [0] // Start with a single character
  }
  next(): string {
    const result = this.indexes.map((i) => this.chars[i]).join('')
    let i = this.indexes.length - 1
    while (i >= 0) {
      this.indexes[i]++
      if (this.indexes[i] < this.chars.length) {
        return result
      }
      this.indexes[i] = 0
      i--
    }
    if (i < 0) {
      this.indexes.unshift(0)
    }
    return result
  }
}

/**
 * Creates a backup of the given file with a `.bak` extension.
 * @param filePath The path of the file to back up.
 */
function backupFile(filePath: string): void {
  const backupPath = `${filePath}.bak`
  if (!fs.existsSync(filePath)) {
    console.error(`Error: File "${filePath}" does not exist.`)
    return
  }
  fs.copyFileSync(filePath, backupPath)
  console.log(`Backup created: ${backupPath}`)
}

const fileRelativePath = '../../src/constants/ActionTypes.ts'
const filePath = path.join(__dirname, fileRelativePath)

backupFile(filePath)

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  const iterator = new AlphaNumericIterator()
  const updatedContent = data.replace(
    /'[^'\n]*?'/g,
    () => `'${iterator.next()}'`,
  )

  fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err)
    } else {
      console.log('File updated successfully!')
    }
  })
})

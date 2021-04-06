import fs from 'fs'
import path from 'path'

const listAllFiles = async (directory: string) => {
  let fileList: string[] = []

  const files = await fs.promises.readdir(directory)
  for (const file of files) {
    const p = path.join(directory, file)
    if ((await fs.promises.stat(p)).isDirectory()) {
      fileList = [...fileList, ...(await listAllFiles(p))]
    } else {
      fileList.push(p)
    }
  }

  return fileList
}

export default listAllFiles

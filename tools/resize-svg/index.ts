import listAllFiles from './listAllFiles'
import resizeSvg from './resizeSvg'
import path from 'path'

const size: number = 21 // in px

;(async () => {
  const fileList = await listAllFiles('./misc/readme_images/browsers/')
  fileList.forEach((filePath) => {
    console.log(filePath)
    const fileName = path.basename(filePath, '.svg')
    resizeSvg(
      filePath,
      `./misc/readme_images/browsers/${fileName}.svg`,
      `${size}px`,
      `${size}px`,
    )
  })
  const fileList2 = await listAllFiles('./misc/readme_images/stack/')
  fileList2.forEach((filePath) => {
    console.log(filePath)
    const fileName = path.basename(filePath, '.svg')
    resizeSvg(
      filePath,
      `./misc/readme_images/stack/${fileName}.svg`,
      `${size}px`,
      `${size}px`,
    )
  })
})()

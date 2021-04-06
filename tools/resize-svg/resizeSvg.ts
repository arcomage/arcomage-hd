import convert from 'xml-js'
import fs from 'fs'

const resizeSvg = (
  filePath: string,
  outputPath: string,
  width: string,
  height: string,
  encoding: string = 'utf8',
): void => {
  fs.readFile(filePath, encoding, (e, data) => {
    const result1 = convert.xml2js(data)
    const svgEl = result1.elements.find(
      (el: any) => el.type === 'element' && el.name === 'svg',
    )
    if (svgEl === undefined) {
      throw new Error(`${filePath}: Can't find <svg> element!`)
    }
    svgEl.attributes.width = width
    svgEl.attributes.height = height
    fs.writeFileSync(outputPath, convert.js2xml(result1))
  })
}

export default resizeSvg

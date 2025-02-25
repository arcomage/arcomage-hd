import fs from 'fs'
import * as visualConsts from '../../src/constants/visuals'

const sassFilePath = 'src/constants/_css_constants.scss'

const sassContent = Object.entries(visualConsts)
  .map(([key, value]) => `$${key}: ${value};`)
  .join('\n')

if (
  fs.existsSync(sassFilePath) &&
  fs.readFileSync(sassFilePath, 'utf8').trim() === sassContent.trim()
) {
  console.log('No changes in Sass variables, skipping update.')
} else {
  fs.writeFileSync(sassFilePath, sassContent, 'utf8')
  console.log('Sass variables updated.')
}

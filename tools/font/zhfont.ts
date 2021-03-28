import { i18n as zhs } from '../../src/i18n/zh-Hans'
import { i18n as zht } from '../../src/i18n/zh-Hant'

const Fontmin = require('fontmin')

const fontmin = new Fontmin()
  .src('./tools/font/SourceHanSerifCN-Heavy.ttf')
  .dest('./tools/font/output')
  .use(
    Fontmin.glyph({
      text: `${zhs.bricks}${zhs.gems}${zhs.recruits}${zht.bricks}${zht.gems}${zht.recruits}`,
      hinting: false,
    }),
  )
  .use(
    Fontmin.ttf2woff({
      deflate: true,
    }),
  )
fontmin.run((err: Error) => {
  if (err) {
    throw err
  }
})

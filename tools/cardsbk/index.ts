import fs from 'fs'

fs.readFile('./src/data/cards.ts', 'utf8', (err, data) => {
  const str = data
    .replace(/'\.\.\/types\/dataCard'/g, "'../../src/types/dataCard'")
    .replace(/'\.\/cardMethods'/g, "'../../src/data/cardMethods'")

  fs.writeFile('./__test__/data/cardsbk.ts', str, 'utf8', (err0) => {
    if (err0) {
      return console.log(err0)
    }
  })
})

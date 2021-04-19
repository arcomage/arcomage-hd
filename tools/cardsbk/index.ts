import fs from 'fs'

fs.readFile('./src/data/cards.ts', 'utf8', function (err, data) {
  const str = data
    .replace(/'\.\.\/types\/dataCard'/g, "'../src/types/dataCard'")
    .replace(/'\.\/cardMethods'/g, "'../src/data/cardMethods'")

  fs.writeFile('./__test__/cardsbk.ts', str, 'utf8', function (err) {
    if (err) {
      return console.log(err)
    }
  })
})

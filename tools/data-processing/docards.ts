import excelToJson from 'convert-excel-to-json'
import fs from 'fs'

const data = excelToJson({
  sourceFile: './tools/data-processing/data.xlsx',
  header: {
    rows: 1,
  },
  sheets: ['cards'],
  columnToKey: {
    A: 'type',
    B: 'index',
    C: 'count',
    D: 'cost',
    E: 'name',
    F: 'desc',
  },
}).cards

data.sort((a, b) => {
  const typeDiff = a.type - b.type
  const indexDiff = a.index - b.index
  return typeDiff !== 0 ? typeDiff : indexDiff
})

// data.forEach((el) => {
//   delete el.index
// })

const dataNew = data.map((el) => ({
  name: el.name,
  desc: el.desc,
  type: el.type,
  cost: el.cost,
  count: el.count,
}))

const resultJson = JSON.stringify(dataNew, null, 2)
fs.writeFileSync('./tools/data-processing/cards.json', resultJson)

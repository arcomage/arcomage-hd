import excelToJson from 'convert-excel-to-json'
import fs from 'fs'

const sourceFile = './tools/data-processing/data.xlsx'
const cardSheetName = 'cards'
const cardSheetI18n = ['en', 'zh-Hans']

const cardSheets = cardSheetI18n.map((locale) => `${cardSheetName}.${locale}`)
cardSheets.unshift(cardSheetName)

const data = excelToJson({
  sourceFile,
  header: {
    rows: 1,
  },
  sheets: cardSheets,
  columnToKey: {
    A: 'type',
    B: 'index',
    C: 'prob',
    D: 'cost',
    E: 'name',
    F: 'desc',
  },
})

cardSheets.forEach((cardSheet) => {
  const curData = data[cardSheet]

  curData.sort((a, b) => {
    const typeDiff = a.type - b.type
    const indexDiff = a.index - b.index
    return typeDiff !== 0 ? typeDiff : indexDiff
  })

  let curDataNew
  if (cardSheet === cardSheetName) {
    curDataNew = curData.map((el) => ({
      name: el.name,
      desc: el.desc,
      type: el.type,
      cost: el.cost,
      prob: el.prob,
    }))
  } else {
    curDataNew = curData.map((el) => ({
      name: el.name,
      desc: el.desc,
    }))
  }

  const resultJson = JSON.stringify(curDataNew, null, 2)
  fs.writeFileSync(`./tools/data-processing/${cardSheet}.json`, resultJson)
})

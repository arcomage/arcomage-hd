import excelToJson from 'convert-excel-to-json'
import fs from 'fs'

const sourceFile = './tools/data-processing/taverns.xlsx'
const sheetName = 'taverns'

const data = excelToJson({
  sourceFile,
  header: {
    rows: 1,
  },
  sheets: [sheetName],
  columnToKey: {
    A: 'continent',
    D: 'name',
    E: 'location',
    F: 'tower',
    G: 'wall',
    H: 'brickProd',
    I: 'gemProd',
    J: 'recruitProd',
    K: 'bricks',
    L: 'gems',
    M: 'recruits',
    N: 'winTower',
    O: 'winResource',
    P: 'cardsInHand',
  },
})

const resultJson = JSON.stringify(data, null, 2)
fs.writeFileSync(`./tools/data-processing/taverns.json`, resultJson)

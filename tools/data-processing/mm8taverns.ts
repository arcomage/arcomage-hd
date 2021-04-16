import excelToJson from 'convert-excel-to-json'
import fs from 'fs'

const sourceFile = './tools/data-processing/mm8taverns.xlsx'
const sheetName = 'mm8taverns'

const data = excelToJson({
  sourceFile,
  header: {
    rows: 1,
  },
  sheets: [sheetName],
  columnToKey: {
    C: 'tavern',
    D: 'location',
    E: 'tower',
    F: 'wall',
    G: 'brickProd',
    H: 'gemProd',
    I: 'recruitProd',
    J: 'bricks',
    K: 'gems',
    L: 'recruits',
    M: 'winTower',
    N: 'winResource',
    O: 'cardsInHand',
  },
})

const resultJson = JSON.stringify(data, null, 2)
fs.writeFileSync(`./tools/data-processing/mm8taverns.json`, resultJson)

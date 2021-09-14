import fs from 'fs'
import path from 'path'
import { i18n } from '../../src/i18n/main/en'

fs.readFile(path.join(__dirname, 'main.txt'), function (error, data) {
  if (error) {
    throw error
  }
  const lines = data.toString().split('\n')
  const res = Object.keys(i18n).reduce(
    (obj, k, i) => ({ ...obj, [k]: lines[i] }),
    {},
  )
  const resultJson = JSON.stringify(res, null, 2)
  fs.writeFileSync(path.join(__dirname, 'main.json'), resultJson)
})

fs.readFile(path.join(__dirname, 'cards.txt'), function (error, data) {
  if (error) {
    throw error
  }
  const lines = data.toString().split('\n')
  const res = []
  for (let i = 0; i < lines.length; i += 2) {
    res.push({ name: lines[i], desc: lines[i + 1] })
  }
  const resultJson = JSON.stringify(res, null, 2)
  fs.writeFileSync(path.join(__dirname, 'cards.json'), resultJson)
})

fs.readFile(path.join(__dirname, 'taverns.txt'), function (error, data) {
  if (error) {
    throw error
  }
  const lines = data.toString().split('\n')
  const res = []
  for (let i = 0; i < lines.length; i += 2) {
    res.push({ name: lines[i], location: lines[i + 1] })
  }
  const resultJson = JSON.stringify(res, null, 2)
  fs.writeFileSync(path.join(__dirname, 'taverns.json'), resultJson)
})

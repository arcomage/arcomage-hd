import fs from 'fs'
import path from 'path'
import readline from 'readline'

const reg = /type:'(.+?)'/

async function processLineByLine() {
  const fileStream = fs.createReadStream(path.join(__dirname, 'redux.js'))

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  const keptLines: string[] = []
  const existedTypes: (string | null)[] = []

  let skip = 0
  for await (const line of rl) {
    const lineTemp = line.trim()
    let type: string | null | undefined = undefined
    if (lineTemp.startsWith('state = ')) {
      const arr = reg.exec(lineTemp)
      if (arr === null) {
        type = null
      } else {
        type = arr[1]
      }
      if (existedTypes.includes(type)) {
        skip = 2
      } else {
        existedTypes.push(type)
      }
    }
    // else if (lineTemp.startsWith('expect(state).toEqual(')) {
    // }
    if (skip === 0) {
      keptLines.push(line)
    } else {
      skip--
    }
  }

  fs.writeFile(
    path.join(__dirname, 'redux_new.js'),
    keptLines.join('\n'),
    (err) => {
      if (err) {
        console.error(err)
        return
      }
    },
  )
}

processLineByLine()

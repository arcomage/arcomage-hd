import https from 'https'
import fs from 'fs'

// get free STUN server list from https://github.com/DamonOehlman/freeice

const url =
  'https://raw.githubusercontent.com/DamonOehlman/freeice/master/stun.json'

https
  .get(url, (res) => {
    let body = ''

    res.on('data', (chunk) => {
      body += chunk
    })

    res.on('end', () => {
      try {
        let json = JSON.parse(body)
        const resultJson = JSON.stringify(json, null, 2)
        fs.writeFileSync(
          './src/webrtc/icelist.ts',
          `const icelist = ${resultJson}

export default icelist
`,
        )
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })
  })
  .on('error', (error: Error) => {
    console.error(error.message)
  })

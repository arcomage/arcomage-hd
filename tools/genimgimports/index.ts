import { writeFileSync } from 'fs'

const start = 0
const end = 101

const outputFile = './src/data/cardImgImports.ts'

let imports = ''
let items = ''

for (let i = start; i <= end; i++) {
  imports += `import image${i} from '../../assets/img/cards/${i}.webp'\n`
  items += `  image${i},\n`
}

const fileContent = `${imports}\nconst images: string[] = [\n${items}]\n\nexport default images\n`

writeFileSync(outputFile, fileContent)

console.log(`✅ Generated file: ${outputFile}`)

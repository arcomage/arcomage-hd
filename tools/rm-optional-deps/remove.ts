import * as fs from 'fs'

const packageJsonPath = 'package.json'
const backupPath = 'package.json.bk'

if (!fs.existsSync(packageJsonPath)) {
  console.error('Error: package.json not found.')
  process.exit(1)
}

const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf-8')
const packageJson = JSON.parse(packageJsonContent)

fs.writeFileSync(backupPath, packageJsonContent, 'utf-8')

if (packageJson.optionalDependencies) {
  delete packageJson.optionalDependencies
}

fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2) + '\n',
  'utf-8',
)

console.log(
  'Removed optionalDependencies and created a backup at package.json.bk.',
)

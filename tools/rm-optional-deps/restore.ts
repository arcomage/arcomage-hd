import * as fs from 'fs'

const packageJsonPath = 'package.json'
const backupPath = 'package.json.bk'

if (!fs.existsSync(backupPath)) {
  console.error('Error: Backup file package.json.bk not found.')
  process.exit(1)
}

fs.copyFileSync(backupPath, packageJsonPath)

fs.unlinkSync(backupPath)

console.log(
  'Restored package.json from package.json.bk and removed the backup.',
)

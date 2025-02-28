import * as fs from 'fs'

const packageJsonPath = 'package.json'
const backupPath = 'package.json.bak'

if (!fs.existsSync(backupPath)) {
  console.error('Error: Backup file package.json.bak not found.')
  process.exit(1)
}

fs.copyFileSync(backupPath, packageJsonPath)

fs.unlinkSync(backupPath)

console.log(
  'Restored package.json from package.json.bak and removed the backup.',
)

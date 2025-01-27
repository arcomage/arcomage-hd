/**
 * This script updates the version in package.json, creates tag and commits change
 * @usage
 * `bun tools/version/bump.ts 1.2.3`
 * `yarn tool:ts tools/version/bump.ts 1.2.3`
 */
import { execSync } from 'child_process'
import fs from 'fs'

const version: string = process.argv[2]

const gitStatus = execSync('git status --porcelain').toString()
if (gitStatus) {
  console.error(
    'Error: Working directory is not clean. Please commit or stash changes first.',
  )
  process.exit(1)
}

if (!version) {
  console.error('Error: No version number provided.')
  console.error('Usage: node bump_version.js <VERSIONNUMBER>')
  process.exit(1)
}

try {
  const packageJsonPath = './package.json'
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  packageJson.version = version
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8',
  )
  console.log(`Updated version to ${version} in package.json`)

  execSync('git add package.json')
  console.log('Staged package.json')

  execSync(`git commit -m "chore: bump version to v${version}"`)
  console.log(`Committed with message: "chore: bump version to v${version}"`)

  execSync(`git tag -a v${version} -m "chore: bump version to v${version}"`)
  console.log(`Created tag: v${version}`)

  execSync('git push --follow-tags')
  console.log('Pushed commits and tags to remote repository')

  console.log(`Version bumped to v${version} and pushed successfully.`)
} catch (error: any) {
  console.error('An error occurred:')
  console.error(error.message)
  process.exit(1)
}

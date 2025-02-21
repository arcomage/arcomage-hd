/**
 * This script updates the version in package.json, creates tag and commits change
 * @usage
 * `bun tools/version/bump.ts <versionOrRelease> [identifier]`
 * `bun tools/version/bump.ts 1.2.3`
 * `bun tools/version/bump.ts patch`
 * `bun tools/version/bump.ts minor`
 * `bun tools/version/bump.ts major`
 * `bun tools/version/bump.ts prerelease alpha`
 * `bun tools/version/bump.ts prerelease beta`
 * `bun tools/version/bump.ts prerelease rc`
 */
import { execSync } from 'child_process'
import fs from 'fs'
import semver from 'semver'

const versionOrRelease: string | undefined = process.argv[2]
const identifier: string | undefined = process.argv[3]

const gitStatus = execSync('git status --porcelain').toString()
if (gitStatus) {
  console.error(
    'Error: Working directory is not clean. Please commit or stash changes first.',
  )
  process.exit(1)
}

if (!versionOrRelease) {
  console.error('Error: No version number or release type provided.')
  process.exit(1)
}

const RELEASE_TYPES = [
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'prerelease',
] as const

type ReleaseType = (typeof RELEASE_TYPES)[number]

function isValidReleaseType(release: string): release is ReleaseType {
  return RELEASE_TYPES.includes(release as ReleaseType)
}

try {
  const packageJsonPath = './package.json'
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

  const oldVersion = packageJson.version

  let version: string
  if (semver.valid(versionOrRelease)) {
    version = versionOrRelease
  } else if (!isValidReleaseType(versionOrRelease)) {
    throw new Error('Invalid version number or release type.')
  } else {
    const _version = identifier
      ? semver.inc(oldVersion, versionOrRelease, identifier)
      : semver.inc(oldVersion, versionOrRelease)
    if (!_version) {
      throw new Error('Invalid version number, release type, or identifier.')
    }
    version = _version
  }

  packageJson.version = version
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    'utf8',
  )
  console.log(
    `Updated version from v${oldVersion} to ${version} in package.json`,
  )

  execSync('git add package.json')
  console.log('Staged package.json')

  execSync(`git commit -m "chore: bump version to v${version}"`)
  console.log(`Committed with message: "chore: bump version to v${version}"`)

  execSync(`git tag -a v${version} -m "chore: bump version to v${version}"`)
  console.log(`Created tag: v${version}`)

  execSync('git push --follow-tags')
  console.log('Pushed commits and tags to remote repository')

  console.log(
    `Version bumped from v${oldVersion} to v${version} and pushed successfully.`,
  )
} catch (error) {
  console.error('An error occurred:')
  if (error instanceof Error) {
    console.error(error.message)
  }
  process.exit(1)
}

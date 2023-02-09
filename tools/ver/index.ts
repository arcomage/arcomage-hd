// run `yarn tool:ver patch`

import util from 'node:util'
import { exec } from 'child_process'
import fs from 'fs'
import { inc, ReleaseType } from 'semver'

const readFilePr = util.promisify(fs.readFile)
const writeFilePr = util.promisify(fs.writeFile)

const execPr = util.promisify(exec)
const execAll = async (cmd: string) => {
  const { stdout, stderr } = await execPr(cmd)
  if (stderr) {
    console.error(stderr)
    return
  }
  console.log(stdout)
}

const args = process.argv.slice(2)

;(async () => {
  try {
    // check if git dirty
    // await execAll('git diff-index --quiet HEAD --')

    const data = await readFilePr('./package.json')
    const packageJsonObj = JSON.parse(data.toString())
    const newVersion = inc(
      packageJsonObj.version,
      <ReleaseType>args[0],
      args[1],
    )
    packageJsonObj.version = newVersion
    const newPackageJsonStr = JSON.stringify(packageJsonObj, null, 2) + '\n'

    await writeFilePr('./package.json', newPackageJsonStr)
    console.log(`version bumped to ${newVersion} in package.json`)

    // await execAll('git add package.json')
    // await execAll(`git commit -m "chore: bump version to ${newVersion}"`)
    // await execAll(
    //   `git tag -a v${newVersion} -m "chore: bump version to ${newVersion}"`,
    // )
    // await execAll('git push --follow-tags')
  } catch (error) {
    console.error(error)
  }
})()

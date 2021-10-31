/**
 * Similar to lodash's `_.chunk(array, [size=1])`
 * (https://lodash.com/docs#chunk),
 * but with an array of variable sizes as the second parameter
 * example see ../../__test__/utils/variousLengthChunk.test.ts
 */
export const variousLengthChunk = <T>(arr: T[], counts: number[]): T[][] => {
  const ret = []
  let start = 0
  for (let i = 0; i < counts.length; i++) {
    const end = start + counts[i]
    ret.push(arr.slice(start, end))
    start = end
  }
  return ret
}

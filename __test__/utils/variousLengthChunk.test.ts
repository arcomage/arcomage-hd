import { variousLengthChunk } from '../../src/utils/variousLengthChunk'

it('upper1st is good', () => {
  const arr = [425, 678, 'f', 76, 29, 'd', 46, 89, true]
  const res = variousLengthChunk(arr, [3, 1, 4])
  expect(res).toStrictEqual([[425, 678, 'f'], [76], [29, 'd', 46, 89]])
})

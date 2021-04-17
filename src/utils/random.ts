// dice must be an integer that is >= 1
export const weightedRandom = (max: number, dice: number): number => {
  let num = 0
  for (let i = 0; i < dice; i++) {
    num += Math.random() * (max / dice)
  }
  return num
}

export const sample = (arr: any[]) =>
  arr[Math.floor(Math.random() * arr.length)]

// min and max included
export const randomIntFrom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

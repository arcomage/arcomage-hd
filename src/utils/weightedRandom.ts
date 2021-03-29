// dice must be an integer that is >= 1

const weightedRandom = (max: number, dice: number): number => {
  let num = 0
  for (let i = 0; i < dice; i++) {
    num += Math.random() * (max / dice)
  }
  return num
}

export default weightedRandom

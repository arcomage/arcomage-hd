export const shallowCompare = <T extends object>(objA: T, objB: T): boolean => {
  if (objA === objB) {
    return true
  }

  const keysA = Object.keys(objA) as Array<keyof T>
  const keysB = Object.keys(objB) as Array<keyof T>

  if (keysA.length !== keysB.length) {
    return false
  }

  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false
    }
  }

  return true
}

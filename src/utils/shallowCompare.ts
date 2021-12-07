export const shallowCompare = (
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) =>
  Object.keys(obj1).length === Object.keys(obj2).length &&
  Object.keys(obj1).every(
    (key) => obj2.hasOwnProperty(key) && obj1[key] === obj2[key],
  )

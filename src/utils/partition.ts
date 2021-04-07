const partition = (array: any[], isValid: (entry: any) => boolean) =>
  array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]]
    },
    [[], []],
  )

export default partition

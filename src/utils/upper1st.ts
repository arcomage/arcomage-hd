// Uppercase for the first letter in a string
export const upper1st = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1)

// The following one can handle i -> İ in `tr` locale, and 𐐶 -> 𐐎
// export const upper1st2 = (
//   [first, ...rest]: string,
//   locale: string = navigator.language,
// ) => first.toLocaleUpperCase(locale) + rest.join('')

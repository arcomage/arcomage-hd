// Uppercase for first letter (in a string containing a sentence)
export const upper1st = (s: string): string =>
  s && s.charAt(0).toUpperCase() + s.slice(1)

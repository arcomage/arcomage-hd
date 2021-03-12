export const entries = Object.entries as <T>(
  o: T,
) => [Extract<keyof T, string>, T[keyof T]][]

export const cloneNode = <T extends Node>(node: T) => {
  return <T>node.cloneNode()
}

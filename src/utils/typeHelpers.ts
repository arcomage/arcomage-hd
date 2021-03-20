export const entries = Object.entries as <T>(
  o: T,
) => [Extract<keyof T, string>, T[keyof T]][]

export const cloneNode = <T extends Node>(node: T) => {
  return <T>node.cloneNode()
}

export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }

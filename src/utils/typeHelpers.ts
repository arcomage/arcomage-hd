export const entries = Object.entries as <T>(
  o: T,
) => [Extract<keyof T, string>, T[keyof T]][]

export const keys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const cloneNode = <T extends Node>(node: T) => {
  return <T>node.cloneNode()
}

export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }

export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

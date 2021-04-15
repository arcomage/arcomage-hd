export const entries = Object.entries as <T>(
  o: T,
) => [Extract<keyof T, string>, T[keyof T]][]

export const fromEntries = <T>(entries: [keyof T, T[keyof T]][]): T =>
  entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), <T>{})

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

export const getProperty = <T, K extends keyof T>(obj: T, key: K) => obj[key] // Inferred type is T[K]

export const setProperty = <T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K],
) => {
  obj[key] = value
}

export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y,
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(prop)

export const notEmpty = <TValue>(
  value: TValue | null | undefined,
): value is TValue => {
  if (value === null || value === undefined) {
    return false
  }
  const testDummy: TValue = value
  return true
}

export const isInArray = <T, A extends T>(
  item: T,
  array: ReadonlyArray<A>,
): item is A => array.includes(item as A)

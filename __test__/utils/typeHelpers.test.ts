import { it, expect } from 'bun:test'
import {
  entries,
  fromEntries,
  setProperty,
  notEmpty,
  isInArray,
} from '@/utils/typeHelpers'

it('entries is OK', () => {
  const obj = { foo: 'bar', baz: 42 }
  const ent = entries(obj)
  expect(ent).toEqual([
    ['foo', 'bar'],
    ['baz', 42],
  ])
})

it('fromEntries is OK', () => {
  const ent: ['foo' | 'baz', string | number][] = [
    ['foo', 'bar'],
    ['baz', 42],
  ]
  const obj = fromEntries(ent)
  expect(obj).toEqual({ foo: 'bar', baz: 42 })
})

it('setProperty is OK', () => {
  const obj = { foo: 'bar', baz: 42 }
  setProperty(obj, 'foo', 'hi')
  expect(obj).toEqual({ foo: 'hi', baz: 42 })
})

it('notEmpty is OK', () => {
  const v1 = null
  const v2 = undefined
  const v3 = NaN
  const v4 = 0
  const v5 = ''
  const v6 = {}
  const v7 = { foo: 'bar', baz: 42 }
  expect(notEmpty(v1)).toBeFalsy()
  expect(notEmpty(v2)).toBeFalsy()
  expect(notEmpty(v3)).toBeTruthy()
  expect(notEmpty(v4)).toBeTruthy()
  expect(notEmpty(v5)).toBeTruthy()
  expect(notEmpty(v6)).toBeTruthy()
  expect(notEmpty(v7)).toBeTruthy()
})

it('isInArray is OK', () => {
  const arr = [194, 42]
  expect(isInArray(42, arr)).toBeTruthy()
  expect(isInArray(2, arr)).toBeFalsy()
})

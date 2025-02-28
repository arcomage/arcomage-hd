import { it, expect } from 'bun:test'
import { READLS_UPDATESTORE_INIT } from '@/constants/ActionTypes'

it('READLS_UPDATESTORE_INIT is good', () => {
  expect(READLS_UPDATESTORE_INIT).toEqual('READLS_UPDATESTORE_INIT')
})

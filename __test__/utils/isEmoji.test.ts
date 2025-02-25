import { it, expect } from 'bun:test'
import {
  defaultOpponentNameList,
  defaultPlayerNameList,
} from '@/constants/defaultSettings'
import isEmoji from '@/utils/isEmoji'

it('isEmoji can test all emojis in the default name lists', () => {
  expect(
    defaultPlayerNameList
      .concat(defaultOpponentNameList)
      .every((emoji) => isEmoji(emoji)),
  ).toBeTruthy()
})

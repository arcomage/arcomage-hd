import {
  defaultOpponentNameList,
  defaultPlayerNameList,
} from '../src/constants/defaultSettings'
import isEmoji from '../src/utils/isEmoji'

it('isEmoji can test all emojis in the default name lists', () => {
  expect(
    defaultPlayerNameList
      .concat(defaultOpponentNameList)
      .every((emoji) => isEmoji(emoji)),
  ).toBeTruthy()
})

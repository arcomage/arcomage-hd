import { preSettings } from '../../src/data/preSettings'
import { allCondAndOtherSettingsEqual } from '../../src/utils/startWinState'

it('preSettings do not have duplicates', () => {
  expect(
    preSettings.every((elBase, iBase) =>
      preSettings.every(
        (el, i) => iBase === i || !allCondAndOtherSettingsEqual(elBase, el),
      ),
    ),
  ).toBeTruthy()
})

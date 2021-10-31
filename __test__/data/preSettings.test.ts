import { preSettings, continents } from '../../src/data/preSettings'
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

it('Resource prods are all >= 1', () => {
  expect(
    preSettings.every(
      (el) => el.brickProd >= 1 && el.gemProd >= 1 && el.recruitProd >= 1,
    ),
  ).toBeTruthy()
})

it("Sum of the count in continents matches preSettings' length", () => {
  expect(preSettings.length).toBe(
    continents.reduce((acc, curr) => acc + curr.count, 0),
  )
})

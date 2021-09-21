import { resProds } from '../constants/resourceNames'
import { DataCardEffectPersonType } from '../types/dataCard'
import { minGeneratorIsOne } from '../constants/ranges'

export const set = (
  person: DataCardEffectPersonType,
  prop: keyof DataCardEffectPersonType,
  to: number,
) => {
  if (minGeneratorIsOne) {
    const min = resProds.includes(prop) ? 1 : 0
    person[prop] = to > min ? to : min
  } else {
    person[prop] = to > 0 ? to : 0
  }
}

export const change = (
  person: DataCardEffectPersonType,
  prop: keyof DataCardEffectPersonType,
  diff: number,
) => {
  set(person, prop, person[prop] + diff)
}

export const damage = (person: DataCardEffectPersonType, n: number) => {
  const d = person.wall - n
  change(person, 'wall', -n)
  if (d < 0) {
    change(person, 'tower', d)
  }
}

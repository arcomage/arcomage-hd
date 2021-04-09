import { resProds } from '../constants/resourceNames'
import { DataCardEffectPersonType } from '../types/dataCard'

export const set = (
  person: DataCardEffectPersonType,
  prop: keyof DataCardEffectPersonType,
  to: number,
) => {
  const min = resProds.includes(prop) ? 1 : 0
  person[prop] = to > min ? to : min
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

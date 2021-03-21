import { DataCardsI18nType } from '../types/dataCard'
import { ArrayElement, keys, RequiredBy } from '../utils/typeHelpers'
import { langs } from './langs'
import { defaultLang } from './langs'

export const availableLangs = keys(langs)

export type AvailableLangType = ArrayElement<typeof availableLangs>

export type TranslationItemType = Partial<Record<string, string>> | null

export type CardsItemType = DataCardsI18nType | null

export type TranslationObjType = {
  i18n: TranslationItemType
  cards: CardsItemType
}

export type TranslationType = Partial<
  Record<AvailableLangType, TranslationObjType>
>

export type TranslationFullType = RequiredBy<
  TranslationType,
  typeof defaultLang
>

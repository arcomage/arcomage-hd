// import { RequiredBy } from '../utils/typeHelpers'
import { langs } from './langs'

export type AvailableLangType = (typeof langs)[number]

export type TranslationItemType = Partial<Record<string, string>> | null

export type DataCardI18nType = {
  name: string
  desc: string
}

export type DataCardsI18nType = DataCardI18nType[]

export type TavernI18nType = { name: string; location: string }

export type TavernsI18nType = TavernI18nType[]

export type TranslationObjType = {
  i18n: TranslationItemType
  cards: DataCardsI18nType | null
  taverns: TavernsI18nType | null
}

export type TranslationType = Partial<
  Record<AvailableLangType, TranslationObjType>
>

// export type TranslationFullType = RequiredBy<
//   TranslationType,
//   typeof defaultLang
// >

export type I18nContextType = {
  i18n: (str: string) => string
  cards: (n: number, cardI18nProp: 'name' | 'desc') => string
  taverns: (i: number, tavernI18nProp: 'name' | 'location') => string
}

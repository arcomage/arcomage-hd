import React, { useEffect, useState } from 'react'
import { i18n as defaultTrans } from './main/en'
import { cardsI18n as defaultCardsI18n } from '../../src/i18n/cards/en'
import { tavernsI18n as defaultTavernsI18n } from '../../src/i18n/taverns/en'
import { AvailableLangType, TranslationObjType } from './types'
import { useAppSelector } from '../utils/hooks/useAppDispatch'
import { I18nContext } from './I18nContext'

const translationDefault: TranslationObjType = {
  i18n: defaultTrans,
  cards: defaultCardsI18n,
  taverns: defaultTavernsI18n,
}

const modules = import.meta.glob('./**/*.ts')

const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  const [translation, setTranslation] = useState(translationDefault)
  const lang = useAppSelector((state): AvailableLangType => state.lang.code)

  useEffect(() => {
    ;(async () => {
      const [{ i18n }, { cardsI18n }, { tavernsI18n }] = await Promise.all([
        modules[`./main/${lang}.ts`]() as Promise<{ i18n: typeof defaultTrans }>,
        modules[`./cards/${lang}.ts`]() as Promise<{ cardsI18n: typeof defaultCardsI18n }>,
        modules[`./taverns/${lang}.ts`]() as Promise<{ tavernsI18n: typeof defaultTavernsI18n }>,
      ])

      setTranslation({ i18n, cards: cardsI18n, taverns: tavernsI18n })
    })()
  }, [lang])

  return (
    <I18nContext.Provider
      value={{
        i18n: (str: string): string => {
          return translation.i18n?.[str] ?? ''
        },
        cards: (n: number, cardI18nProp: 'name' | 'desc'): string => {
          const c = translation.cards
          const card = c?.[n]
          return card?.[cardI18nProp] ?? ''
        },
        taverns: (i: number, tavernI18nProp: 'name' | 'location'): string => {
          const c = translation.taverns
          const tavern = c?.[i]
          return tavern?.[tavernI18nProp] ?? ''
        },
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export default I18nProvider

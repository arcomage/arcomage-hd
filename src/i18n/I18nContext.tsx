import { createContext } from 'react'

import { I18nContextType } from './types'

const transObjDefault = { i18n: () => '', cards: () => '', taverns: () => '' }

export const I18nContext = createContext<I18nContextType>(transObjDefault)

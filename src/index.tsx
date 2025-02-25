import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import I18nProvider from '@/i18n/I18nProvider'
import GameSizeProvider from '@/utils/contexts/GameSizeProvider'
import App from './App'
import rootEpic from './epics'
import { store, epicMiddleware } from './store'

epicMiddleware.run(rootEpic)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HelmetProvider>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <I18nProvider>
          <GameSizeProvider>
            <App />
          </GameSizeProvider>
        </I18nProvider>
      </ReduxProvider>
    </React.StrictMode>
  </HelmetProvider>,
)

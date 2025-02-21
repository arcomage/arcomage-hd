import './utils/polyfill'

import './styles/index.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider as ReduxProvider } from 'react-redux'
import { store, epicMiddleware } from './store'
import rootEpic from './epics'
import I18nProvider from './i18n/I18nProvider'
import GameSizeProvider from './utils/contexts/GameSizeProvider'
import { HelmetProvider } from 'react-helmet-async'

import './utils/swreg'

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

// pwacompat.js inserted after it, see webpack.config.js

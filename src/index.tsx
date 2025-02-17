import './utils/polyfill'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { store, epicMiddleware } from './store'
import rootEpic from './epics'
import { I18nProvider } from './i18n/I18nContext'
import { GameSizeProvider } from './utils/contexts/GameSizeContext'
import { HelmetProvider } from 'react-helmet-async'

import './utils/swreg'

epicMiddleware.run(rootEpic)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <HelmetProvider>
    <React.StrictMode>
      <Provider store={store}>
        <I18nProvider>
          <GameSizeProvider>
            <App />
          </GameSizeProvider>
        </I18nProvider>
      </Provider>
    </React.StrictMode>
  </HelmetProvider>,
)

// pwacompat.js inserted after it, see webpack.config.js

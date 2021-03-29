import './utils/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store, epicMiddleware } from './store'
import rootEpic from './epics'
import { I18nProvider } from './i18n/I18nContext'
import { GameSizeProvider } from './utils/GameSizeContext'

import { HelmetProvider } from 'react-helmet-async'

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </GameSizeProvider>
      </I18nProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

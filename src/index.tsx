import './utils/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store, epicMiddleware } from './store'
import rootEpic from './epics'
import { I18nProvider } from './i18n/I18nContext'
import { GameSizeProvider } from './utils/GameSizeContext'

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nProvider>
        <GameSizeProvider>
          <App />
        </GameSizeProvider>
      </I18nProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

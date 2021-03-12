import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import rootEpic from './epics'
import { createEpicMiddleware } from 'redux-observable'

const epicMiddleware = createEpicMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
)

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

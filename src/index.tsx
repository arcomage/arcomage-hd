import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
)
sagaMiddleware.run(mySaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

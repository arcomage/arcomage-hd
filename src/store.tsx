import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import { createEpicMiddleware } from 'redux-observable'

export const epicMiddleware = createEpicMiddleware()

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(epicMiddleware)),
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

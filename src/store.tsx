import { configureStore } from '@reduxjs/toolkit'
import { createEpicMiddleware } from 'redux-observable'
import rootReducer from './reducers'
import { RootActionType } from './types/actionObj'
import { RootStateType } from './types/state'

export const epicMiddleware = createEpicMiddleware<
  RootActionType,
  RootActionType,
  RootStateType
>()

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

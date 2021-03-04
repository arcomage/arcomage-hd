import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'

const rootReducer = combineReducers({
  status,
  lang
})

export default rootReducer

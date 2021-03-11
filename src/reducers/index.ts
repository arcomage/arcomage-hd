import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'
import cards from './cards'

const rootReducer = combineReducers({
  status,
  lang,
  cards,
})

export default rootReducer

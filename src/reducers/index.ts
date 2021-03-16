import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'
import cards from './cards'
import game from './game'

const rootReducer = combineReducers({
  status,
  lang,
  cards,
  game,
})

export default rootReducer

import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'
import cards from './cards'
import game from './game'
import settings from './settings'

const rootReducer = combineReducers({
  status,
  lang,
  cards,
  game,
  settings,
})

export default rootReducer

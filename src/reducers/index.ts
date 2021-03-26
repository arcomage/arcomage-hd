import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'
import cards from './cards'
import game from './game'
import settings from './settings'
import screen from './screen'

const rootReducer = combineReducers({
  status,
  lang,
  cards,
  game,
  settings,
  screen,
})

export default rootReducer

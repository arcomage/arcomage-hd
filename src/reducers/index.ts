import { combineReducers } from 'redux'
import ai from './ai'
import cards from './cards'
import game from './game'
import lang from './lang'
import multiplayer from './multiplayer'
import screen from './screen'
import settings from './settings'
import sound from './sound'
import status from './status'
import visual from './visual'

const rootReducer = combineReducers({
  status,
  lang,
  cards,
  game,
  settings,
  screen,
  sound,
  visual,
  ai,
  multiplayer,
})

export default rootReducer

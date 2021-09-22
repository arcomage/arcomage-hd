import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'
import cards from './cards'
import game from './game'
import settings from './settings'
import screen from './screen'
import volume from './volume'
import visual from './visual'
import ai from './ai'
import multiplayer from './multiplayer'

const rootReducer = combineReducers({
  status,
  lang,
  cards,
  game,
  settings,
  screen,
  volume,
  visual,
  ai,
  multiplayer,
})

export default rootReducer

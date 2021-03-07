import { combineReducers } from 'redux'
import status from './status'
import lang from './lang'
import visual from './visual'

const rootReducer = combineReducers({
  status,
  lang,
  visual,
})

export default rootReducer

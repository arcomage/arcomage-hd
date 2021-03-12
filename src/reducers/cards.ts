import produce from 'immer'
// import {  } from '../constants/ActionTypes'
// import {  } from '../types/actionObj'
import { StatusType } from '../types/state'
import { defaultCards } from '../constants/defaultCards'
import dataCards from '../data/cards'

const cards = produce((draft: StatusType, action: any) => {}, defaultCards)

export default cards

import {
  DiscardCardCoreActionType,
  InitToQueueActionType,
  UseCardCoreActionType,
} from '../types/actionObj'
import Queue from './Queue'

export const drawCardQueue = new Queue<number>()

export const playCardQueue = new Queue<
  UseCardCoreActionType | DiscardCardCoreActionType
>()

export const initQueue = new Queue<Omit<InitToQueueActionType, 'type'>>()
// Omit<InitToQueueActionType, 'type'> is:
// {
//   playersTurn: boolean
//   cardList: CardListItemAllType[]
//   gameNumber: number | null
// }

if (process.env.ISDEV) {
  ;(window as any).dcq = drawCardQueue
  ;(window as any).pcq = playCardQueue
  ;(window as any).icq = initQueue
}

import {
  DiscardCardCoreActionType,
  InitToQueueActionType,
  UseCardCoreActionType,
} from '../types/actionObj'
import Queue from './Queue'

export const drawCardQueues = new Map<number, Queue<number>>()

export const playCardQueues = new Map<
  number,
  Queue<UseCardCoreActionType | DiscardCardCoreActionType>
>()

export const initQueue = new Queue<Omit<InitToQueueActionType, 'type'>>()
// Omit<InitToQueueActionType, 'type'> is:
// {
//   playersTurn: boolean
//   cardList: CardListItemAllType[]
//   gameNumber: number | null
// }

if (process.env.ISDEV) {
  ;(window as any).dq = drawCardQueues
  ;(window as any).pq = playCardQueues
  ;(window as any).iq = initQueue
}

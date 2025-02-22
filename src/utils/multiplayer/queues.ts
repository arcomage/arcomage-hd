import { isProd } from '../../constants/devSettings'
import {
  DiscardCardCoreActionType,
  InitToQueueActionType,
  UseCardCoreActionType,
} from '../../types/actionObj'
import Queue from './Queue'

export const drawCardQueues = new Map<number, Queue<number>>()

export const playCardQueues = new Map<
  number,
  Queue<UseCardCoreActionType | DiscardCardCoreActionType>
>()

export const initQueues = new Map<
  number,
  Queue<Omit<InitToQueueActionType, 'type'>>
>()
// Omit<InitToQueueActionType, 'type'> is:
// {
//   playersTurn: boolean
//   cardList: CardListItemAllType[]
//   gameNumber: number | null
// }

if (!isProd) {
  ;(window as Window & typeof globalThis & { dq: unknown }).dq = drawCardQueues
  ;(window as Window & typeof globalThis & { pq: unknown }).pq = playCardQueues
  ;(window as Window & typeof globalThis & { iq: unknown }).iq = initQueues
}

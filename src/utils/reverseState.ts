import { CardListItemAllType, ownerType, ownerType2 } from '../types/state'

type ObjectType<T> = T extends ownerType2
  ? ownerType2
  : T extends ownerType
  ? ownerType
  : never

export const isOwnerType2 = (owner: ownerType): owner is ownerType2 =>
  owner === 'player' || owner === 'opponent'

export const reverseOwnerStr = (owner: ownerType2): ownerType2 =>
  owner === 'player' ? 'opponent' : 'player'

export const reverseCardList = (
  cardList: CardListItemAllType[],
): CardListItemAllType[] => {
  return cardList.map((card) =>
    card !== null
      ? {
          ...card,
          owner: isOwnerType2(card.owner)
            ? reverseOwnerStr(card.owner)
            : card.owner,
        }
      : null,
  )
}

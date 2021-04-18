import {
  CardListItemAllType,
  ownerType,
  ownerType2,
  SettingsStateAllPartialType,
} from '../types/state'
import produce from 'immer'
import { FormFieldsAllPartialType } from '../types/formFields'

export const reverseSettingsState = (
  state: SettingsStateAllPartialType,
): SettingsStateAllPartialType => {
  return produce(state, (draft: SettingsStateAllPartialType) => {
    if ('playerName' in draft && 'opponentName' in draft) {
      const tempSettingsPlayerName = draft.playerName
      draft.playerName = draft.opponentName
      draft.opponentName = tempSettingsPlayerName
    }
    if ('playerName' in draft && !('opponentName' in draft)) {
      draft.opponentName = draft.playerName
    }
    if (!('playerName' in draft) && 'opponentName' in draft) {
      draft.playerName = draft.opponentName
    }
  })
}

export const reverseFormFields = (
  formFields: FormFieldsAllPartialType,
): FormFieldsAllPartialType => {
  if (formFields.playerName !== undefined) {
    const { playerName, ...rest } = formFields
    const ret: FormFieldsAllPartialType = {
      opponentName: playerName,
      ...rest,
    }
    return ret
  }
  return formFields
}

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

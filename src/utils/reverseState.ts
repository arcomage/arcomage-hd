import {
  CardListItemAllType,
  SettingsStateAllPartialType,
} from '../types/state'
import produce from 'immer'
import { FormFieldsAllPartialType } from '../types/formFields'

// type ExchangeStateExtraType = ExchangeStateType & {
//   formfields: FormFieldsAllPartialType
// }

// type ExchangeStateExtraRetType = ExchangeStateType & {
//   formfields: TempFormFieldsExchangeType
// }

// const reverseState = <K extends keyof ExchangeStateExtraType>(
//   type: K,
//   state: ExchangeStateExtraType[K],
// ): ExchangeStateExtraRetType[K] => {
//   switch (type) {
//     case 'status':
//       return produce(state, (draft: StatusType) => {
//         const tempStatusPlayer = draft.player
//         draft.player = draft.opponent
//         draft.opponent = tempStatusPlayer
//       })
//     case 'cards':
//       return produce(state, (draft: CardStateType) => {
//         const tempCardsTotalPlayer = draft.total.player
//         draft.total.player = draft.total.opponent
//         draft.total.opponent = tempCardsTotalPlayer

//         const tempCardsNextPosPlayer = draft.nextPos.player
//         draft.nextPos.player = draft.nextPos.opponent
//         draft.nextPos.opponent = tempCardsNextPosPlayer
//       })
//     case 'game':
//       return produce(state, (draft: GameStateType) => {
//         draft.playersTurn = !draft.playersTurn
//       })
//   }
// }

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

export const reverseCardList = (
  cardList: CardListItemAllType[],
): CardListItemAllType[] => {
  return cardList.map((card) =>
    card !== null
      ? {
          ...card,
          owner:
            card.owner === 'player'
              ? 'opponent'
              : card.owner === 'opponent'
              ? 'player'
              : card.owner,
        }
      : null,
  )
}

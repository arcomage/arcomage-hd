import { ExchangeStateType } from '../types/state'
import produce from 'immer'

const reverseState = (state: ExchangeStateType): ExchangeStateType =>
  produce(state, (draft) => {
    const tempStatusPlayer = draft.status.player
    draft.status.player = draft.status.opponent
    draft.status.opponent = tempStatusPlayer

    const tempCardsTotalPlayer = draft.cards.total.player
    draft.cards.total.player = draft.cards.total.opponent
    draft.cards.total.opponent = tempCardsTotalPlayer

    const tempCardsNextPosPlayer = draft.cards.nextPos.player
    draft.cards.nextPos.player = draft.cards.nextPos.opponent
    draft.cards.nextPos.opponent = tempCardsNextPosPlayer

    draft.game.playersTurn = !draft.game.playersTurn

    const tempSettingsPlayerName = draft.settings.playerName
    draft.settings.playerName = draft.settings.opponentName
    draft.settings.opponentName = tempSettingsPlayerName
  })

export default reverseState

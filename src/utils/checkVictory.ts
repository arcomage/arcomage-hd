import { resNames } from '../constants/resourceNames'
import {
  EndScreenStateType,
  GameEndReasonsType,
  PersonStatusType,
} from '../types/state'
import { I18nContextType } from '../i18n/types'

const getTrueIndexes = (arr: boolean[]): number[] =>
  arr.reduce<number[]>((acc, value, index) => {
    if (value) {
      acc.push(index)
    }
    return acc
  }, [])

export const checkVictory = (
  player: PersonStatusType,
  opponent: PersonStatusType,
  winTower: number,
  winResource: number,
) => {
  const winReasons = [
    opponent.tower <= 0,
    player.tower >= winTower,
    player.bricks >= winResource,
    player.gems >= winResource,
    player.recruits >= winResource,
  ]
  const loseReasons = [
    player.tower <= 0,
    opponent.tower >= winTower,
    opponent.bricks >= winResource,
    opponent.gems >= winResource,
    opponent.recruits >= winResource,
  ]

  const winReasonIndexes = getTrueIndexes(winReasons)
  const loseReasonIndexes = getTrueIndexes(loseReasons)

  const reasons: GameEndReasonsType = {}

  if (winReasonIndexes.length > 0) {
    reasons.win = winReasonIndexes
  }
  if (loseReasonIndexes.length > 0) {
    reasons.lose = loseReasonIndexes
  }

  let type: EndScreenStateType['type'] = null

  if (winReasons.includes(true) && !loseReasons.includes(true)) {
    type = 'win'
  } else if (!winReasons.includes(true) && loseReasons.includes(true)) {
    type = 'lose'
  } else if (winReasons.includes(true) && loseReasons.includes(true)) {
    type = 'tie'
  }

  return type
    ? {
        type,
        reasons,
      }
    : null
}

export const reasonTranslate = (
  reasonIndex: number,
  isWin: boolean,
  _: I18nContextType,
) => {
  if (isWin) {
    if (reasonIndex === 0) {
      return _.i18n('Your opponent has no tower left')
    } else if (reasonIndex === 1) {
      return _.i18n('%s has reached the victory condition').replace(
        '%s',
        _.i18n('Your %s').replace('%s', _.i18n('tower')),
      )
    } else {
      return _.i18n('%s have reached the victory condition').replace(
        '%s',
        _.i18n('Your %s').replace('%s', _.i18n(resNames[reasonIndex - 2])),
      )
    }
  } else {
    // is lose
    if (reasonIndex === 0) {
      return _.i18n('You have no tower left')
    } else if (reasonIndex === 1) {
      return _.i18n('%s has reached the victory condition').replace(
        '%s',
        _.i18n("Opponent's %s").replace('%s', _.i18n('tower')),
      )
    } else {
      return _.i18n('%s have reached the victory condition').replace(
        '%s',
        _.i18n("Opponent's %s").replace(
          '%s',
          _.i18n(resNames[reasonIndex - 2]),
        ),
      )
    }
  }
}

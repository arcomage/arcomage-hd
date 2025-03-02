import React, { useContext } from 'react'
import dataCards from '@/data/cards'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import { tooltipAttrs } from '@/utils/tooltip'
import styles from './Card.module.scss'

type PropType = {
  n: number // 0 | 1 | 2 | ...
}
const CardRes = ({ n }: PropType) => {
  const { type, cost } = dataCards[n]
  const _ = useContext(I18nContext)
  const cardTooltip = _.i18n('This card costs %s').replace(
    '%s',
    cost === 1
      ? _.i18n(['1 brick', '1 gem', '1 recruit'][type])
      : _.i18n(['%s bricks', '%s gems', '%s recruits'][type]).replace(
          '%s',
          cost.toString(),
        ),
  )

  return (
    <div className={styles.resall}>
      <div
        className={cl(
          styles.resbg,
          [styles.brick, styles.gem, styles.recruit][type],
        )}
      ></div>
      <div
        className={cl(styles.cost, 'el-number')}
        {...tooltipAttrs(cardTooltip, undefined, { noTouch: true })}
      >
        {cost}
      </div>
    </div>
  )
}

export default CardRes

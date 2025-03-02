import React, { useContext } from 'react'
import { cardNameMaxLength } from '@/constants/visuals'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import styles from './Card.module.scss'

type PropType = {
  n: number // 0 | 1 | 2 | ...
}
const CardName = ({ n }: PropType) => {
  const _ = useContext(I18nContext)
  const cardName = _.cards(n, 'name')
  const cardNameLength = cardName.length
  return (
    <div
      className={cl(styles.cardname, 'el-text cantoggleboldfont')}
      style={{
        fontSize:
          cardNameLength > cardNameMaxLength
            ? `calc(var(--cardwidth) * 0.094 * ${cardNameMaxLength + 1} / ${cardNameLength})`
            : 'inherit',
      }}
    >
      {cardName}
    </div>
  )
}

export default CardName

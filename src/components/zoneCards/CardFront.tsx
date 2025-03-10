import cl from 'clarr'
import React from 'react'
import styles from './Card.module.scss'
import CardDesc from './CardDesc'
import CardImage from './CardImage'
import CardName from './CardName'
import CardRes from './CardRes'

type PropType = {
  n: number // 0 | 1 | 2 | ...
  unusable?: boolean
  discarded?: boolean
  zeroOpacity?: boolean
}
const CardFront = ({
  n,
  unusable = false,
  discarded = false,
  zeroOpacity = false,
}: PropType) => {
  return (
    <div
      className={cl(
        styles.cardfront,
        zeroOpacity
          ? 'opacity-0'
          : unusable
            ? styles.unusableopacity
            : 'opacity-100',
      )}
    >
      <CardName n={n} />
      <CardImage n={n} discarded={discarded} />
      <CardDesc n={n} />
      <CardRes n={n} />
    </div>
  )
}

export default CardFront

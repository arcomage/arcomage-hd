import cl from 'clarr'
import React from 'react'
import styles from './Card.module.scss'

type PropType = {
  unusable?: boolean
  zeroOpacity?: boolean
}
const CardBack = ({ unusable = false, zeroOpacity = false }: PropType) => {
  return (
    <div
      className={cl(
        styles.cardback,
        zeroOpacity
          ? 'opacity-0'
          : unusable
            ? styles.unusableopacity
            : 'opacity-100',
      )}
    >
      <div className={cl(styles.cardbackimage, 'pixelated')}></div>
    </div>
  )
}

export default CardBack

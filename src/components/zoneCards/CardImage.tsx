import React, { useContext } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import cl from '@/utils/clarr'
import styles from './Card.module.scss'

// `import.meta.glob()` is vite-only
const images = import.meta.glob('../../../assets/img/cards/*.webp', {
  eager: true,
})
const getImageUrl = (n: number) => {
  return (
    (images[`../../../assets/img/cards/${n}.webp`] as { default: string })
      ?.default || ''
  )
}

type PropType = {
  n: number // 0 | 1 | 2 | ...
  discarded?: boolean
}
const CardImage = ({ n, discarded = false }: PropType) => {
  const _ = useContext(I18nContext)
  return (
    <div className={styles.imagewrapper}>
      <div
        style={{
          backgroundImage: `url(${getImageUrl(n)})`,
        }}
        className={cl(styles.imageholder, 'pixelated')}
      ></div>
      {discarded && (
        <div className={cl(styles.discarded, 'el-text')}>
          {_.i18n('discarded')}
        </div>
      )}
    </div>
  )
}

export default CardImage

import cl from 'clarr'
import React, { useContext } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import styles from './Card.module.scss'

type PropType = {
  n: number // 0 | 1 | 2 | ...
}
const CardDesc = ({ n }: PropType) => {
  const _ = useContext(I18nContext)
  return (
    <div className={styles.text}>
      <div className={cl(styles.textholder, 'el-text cantoggleboldfont')}>
        {_.cards(n, 'desc')}
      </div>
    </div>
  )
}

export default CardDesc

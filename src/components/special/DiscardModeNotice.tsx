import cl from 'clarr'
import React, { useContext } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import styles from './DiscardModeNotice.module.scss'

type PropType = {
  shown?: boolean
}
const DiscardModeNotice = ({ shown = true }: PropType) => {
  const _ = useContext(I18nContext)
  return shown ? (
    <div className={cl(styles.main, 'robotocondensed el-text')}>
      {_.i18n('Discard a card')}
    </div>
  ) : null
}

export default DiscardModeNotice

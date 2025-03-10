import cl from 'clarr'
import React, { useContext, useState } from 'react'
import { I18nContext } from '@/i18n/I18nContext'
import styles from './EndScreenReviewCardsBtn.module.scss'

const EndScreenReviewCardsBtn = () => {
  const _ = useContext(I18nContext)
  const [useStyle, setUseStyle] = useState(false)
  const toggleUseStyle = () => {
    setUseStyle((_useStyle) => !_useStyle)
  }
  return (
    <>
      {useStyle && (
        <style>{`
.card:not(.card-pos--1) {
  z-index: 100;
  pointer-events: none;
}
.card-pos--5 > div,
.card-pos--4 > div,
.card-pos--3 > div,
.card-pos--2 > div {
  opacity: 0.9;
}`}</style>
      )}
      <button
        className={cl(
          styles.main,
          'robotocondensed endscreen-review-cards-btn',
        )}
        accessKey="c"
        onClick={(e) => {
          e.stopPropagation()
          toggleUseStyle()
        }}
        onContextMenu={(e) => {
          e.preventDefault()
          e.stopPropagation()
          toggleUseStyle()
        }}
        onKeyDown={(e) => {
          e.stopPropagation()
        }}
      >
        {useStyle ? _.i18n('Hide cards') : _.i18n('Review cards')}
      </button>
    </>
  )
}

export default EndScreenReviewCardsBtn

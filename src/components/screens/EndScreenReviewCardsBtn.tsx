import React, { memo, useState } from 'react'

const EndScreenReviewCardsBtn = () => {
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
  opacity: 1;
}`}</style>
      )}
      <button
        className="font-sans font-bold text-lg text-black shadow-sm shadow-blue-400 bg-blue-500 px-1 rounded absolute top-12 left-1/4 transition-bg duration-500 hover:bg-blue-400 focus:outline focus:outline-2"
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
        {useStyle ? 'Hide cards' : 'Review cards'}
      </button>
    </>
  )
}

export default memo(EndScreenReviewCardsBtn)

import React, { memo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAppSelector } from '../../utils/useAppDispatch'

const SvgFilters = () => {
  const pixelationLevel = useAppSelector((state) => state.visual.pixelation)
  return (
    <>
      <Helmet>
        <style type="text/css">{`.pixelated { filter: ${
          pixelationLevel > 0 ? 'url(#pixelation)' : 'none'
        }; }`}</style>
      </Helmet>
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <filter id="pixelation" x="0" y="0">
          <feFlood x="1" y="1" height="1" width="1" />
          <feComposite width={pixelationLevel} height={pixelationLevel} />
          <feTile />
          <feComposite in="SourceGraphic" operator="in" />
          <feMorphology operator="dilate" radius={pixelationLevel / 2} />
        </filter>
      </svg>
    </>
  )
}

export default memo(SvgFilters)

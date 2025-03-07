import React from 'react'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'
import styles from './SvgFilters.module.scss'

const SvgFilters = () => {
  const pixelationLevel = useAppSelector((state) => state.visual.pixelation)
  return (
    <>
      <style>{`.pixelated { filter: ${
        pixelationLevel > 0 ? 'url(#pixelation)' : 'none'
      }; }`}</style>
      <svg className={styles.main} aria-hidden={true}>
        <filter id="pixelation" x="0" y="0">
          <feFlood x="1" y="1" height="1" width="1" />
          <feComposite width={pixelationLevel} height={pixelationLevel} />
          <feTile />
          <feComposite in="SourceGraphic" operator="in" />
          <feMorphology operator="dilate" radius={pixelationLevel / 2} />
        </filter>
        <filter id="twist">
          <feTurbulence
            id="turbulence4"
            baseFrequency="0.02"
            numOctaves="3"
            result="noise"
            seed="3"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
        </filter>
        <filter id="grain">
          <feTurbulence baseFrequency="0.60,0.90" result="colorNoise" />
          <feColorMatrix
            in="colorNoise"
            type="matrix"
            values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
          />
          <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
          <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
        </filter>
      </svg>
    </>
  )
}

export default SvgFilters

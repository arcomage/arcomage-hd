import React, { useEffect, useRef, useState } from 'react'
import { startSoundLength, typingSoundLength } from '@/constants/visuals'
import cl from '@/utils/clarr'
import { play } from '@/utils/sound/Sound'
import styles from './Birds.module.scss'

type PropType = { index: 1 | 2 }

const Bird = ({ index }: PropType) => {
  const [sounds, setSounds] = useState<boolean[]>([])
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    return () => {
      // no lint reason: expected to change before cleanup
      // eslint-disable-next-line react-compiler/react-compiler
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  return (
    <div
      className={cl(
        'z-10',
        styles.birdcontainer,
        styles[index === 1 ? 'birdcontainer1' : 'birdcontainer2'],
      )}
      aria-hidden={true}
      onClick={() => {
        const sound = Math.random() < 0.5 ? 'start' : 'typing'
        const length = {
          start: startSoundLength,
          typing: typingSoundLength,
        }[sound]
        play(sound)

        setSounds((prev) => [...prev, true])
        const timeoutId = setTimeout(() => {
          setSounds((prev) => {
            const updated = [...prev]
            updated.shift()
            return updated
          })
        }, length)
        timeoutRefs.current.push(timeoutId)
      }}
    >
      <div
        className={cl(styles.bird, styles[index === 1 ? 'bird1' : 'bird2'])}
      ></div>
      <svg
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
        className={cl(styles.svg, sounds.length > 0 && styles.shown)}
        aria-hidden={true}
      >
        <path
          d="m10.495 1.4998c-5.9969 0-8.9954 3.1334-8.9954 9.4001v28.2c0 6.2667 2.9985 9.4001 8.9954 9.4001h14.393c5.9969 0 8.9954-3.1334 8.9954-9.4001v-4.7l13.493-9.4001-13.493-9.4001v-4.7c0-6.2667-2.9985-9.4001-8.9954-9.4001z"
          className={styles.svgpath}
        />
        <text x="8" y="35" aria-hidden={true} className={styles.svgtext}>
          𝄞
        </text>
      </svg>
    </div>
  )
}

const Birds = () => {
  return (
    <>
      <Bird index={1} />
      <Bird index={2} />
    </>
  )
}

export default Birds

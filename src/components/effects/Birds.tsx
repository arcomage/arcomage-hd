import React, { useEffect, useRef, useState } from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'

import bird from '../../../assets/img/bird.svg'
import { play } from '../../utils/sound/Sound'
import { startSoundLength, typingSoundLength } from '../../constants/visuals'

const useStyles = createUseStyles({
  '@keyframes fly-cycle': {
    '100%': {
      'background-position': '-900px',
    },
  },

  '@keyframes fly-right-one': {
    '0%': {
      transform: 'translateX(-10vw) scale(0.3) translateZ(0)',
    },

    '10%': {
      transform: 'translateY(2vh) translateX(10vw) scale(0.4) translateZ(0)',
    },

    '20%': {
      transform: 'translateY(0vh) translateX(30vw) scale(0.5) translateZ(0)',
    },

    '30%': {
      transform: 'translateY(4vh) translateX(50vw) scale(0.6) translateZ(0)',
    },

    '40%': {
      transform: 'translateY(2vh) translateX(70vw) scale(0.6) translateZ(0)',
    },

    '50%': {
      transform: 'translateY(0vh) translateX(90vw) scale(0.6) translateZ(0)',
    },

    '60%': {
      transform: 'translateY(0vh) translateX(110vw) scale(0.6) translateZ(0)',
    },

    '100%': {
      transform: 'translateY(0vh) translateX(110vw) scale(0.6) translateZ(0)',
    },
  },

  birdcontainer: {
    'html[data-noanime="true"] &': {
      display: 'none',
    },
    position: 'absolute',
    top: '32%',
    left: '-10%',
    transform: 'scale(0) translateX(-10vw) translateZ(0)',
    'will-change': 'transform',
    'animation-name': '$fly-right-one',
    'animation-timing-function': 'linear',
    'animation-iteration-count': 'infinite',
  },

  birdcontainer1: {
    'animation-duration': '15s',
    'animation-delay': '0',
  },

  birdcontainer2: {
    'animation-duration': '15.5s',
    'animation-delay': '1s',
  },

  bird: {
    'background-image': `url(${bird})`,
    'background-size': 'auto 100%',
    width: '44px',
    height: '62.5px',
    'will-change': 'background-position',
    'animation-name': '$fly-cycle',
    'animation-timing-function': 'steps(10)',
    'animation-iteration-count': 'infinite',
  },

  bird1: {
    'animation-duration': '1s',
    'animation-delay': '-0.5s',
  },

  bird2: {
    'animation-duration': '0.9s',
    'animation-delay': '-0.75s',
  },

  svg: {
    position: 'absolute',
    top: '6px',
    left: '-50px',
    opacity: 0,
    'will-change': 'opacity',
    transition: 'opacity 0.5s ease-in-out',
  },
  shown: {
    opacity: 1,
  },
  svgpath: {
    fill: '#fff',
    stroke: '#000',
    'stroke-width': 3,
  },
  svgtext: {
    'font-size': '35px',
    'font-weight': 'bold',
  },
})

type PropType = { index: 1 | 2 }

const Bird = ({ index }: PropType) => {
  const [sounds, setSounds] = useState<boolean[]>([])
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      // no lint reason: expected to change before cleanup
      // eslint-disable-next-line react-compiler/react-compiler
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeoutRefs.current.forEach(clearTimeout)
    }
  }, [])

  const classes = useStyles()
  return (
    <div
      className={cx(
        'z-10',
        classes.birdcontainer,
        classes[index === 1 ? 'birdcontainer1' : 'birdcontainer2'],
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
        className={cx(classes.bird, classes[index === 1 ? 'bird1' : 'bird2'])}
      ></div>
      <svg
        width="50"
        height="50"
        xmlns="http://www.w3.org/2000/svg"
        className={cx(classes.svg, {
          [classes.shown]: sounds.length > 0,
        })}
        aria-hidden={true}
      >
        <path
          d="m10.495 1.4998c-5.9969 0-8.9954 3.1334-8.9954 9.4001v28.2c0 6.2667 2.9985 9.4001 8.9954 9.4001h14.393c5.9969 0 8.9954-3.1334 8.9954-9.4001v-4.7l13.493-9.4001-13.493-9.4001v-4.7c0-6.2667-2.9985-9.4001-8.9954-9.4001z"
          className={classes.svgpath}
        />
        <text x="8" y="35" aria-hidden={true} className={classes.svgtext}>
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

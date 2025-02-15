import React from 'react'
import cx from 'clsx'
import { createUseStyles } from 'react-jss'
import TooltipAll from '../special/TooltipAll'
import { githubUrl } from '../../constants/devSettings'
import { useAppSelector } from '../../utils/hooks/useAppDispatch'

const useStyles = createUseStyles<string>({
  '@keyframes visible1by1-1-3': {
    '0%, 100%, 33.32%': {
      visibility: 'visible',
    },
    '33.33%, 99.99%': {
      visibility: 'hidden',
    },
  },
  '@keyframes visible1by1-2-3': {
    '0%, 100%, 33.32%': {
      visibility: 'hidden',
    },
    '33.33%, 66.65%': {
      visibility: 'visible',
    },
    '66.66%, 99.99%': {
      visibility: 'hidden',
    },
  },
  '@keyframes visible1by1-3-3': {
    '0%, 100%, 66.65%': {
      visibility: 'hidden',
    },
    '66.66%, 99.99%': {
      visibility: 'visible',
    },
  },
  githubButton: {
    left: 'calc(60% + 15rem)',
    '& svg': {
      '& .el-0': {
        visibility: 'visible',
      },
      '& .el-1': {
        visibility: 'hidden',
      },
      '& .el-2': {
        visibility: 'hidden',
      },
    },
    'html[data-noanime="false"] &': {
      '&:hover, &:focus': {
        '& svg': {
          '& .el-0': {
            visibility: 'hidden',
            animation: '$visible1by1-2-3 0.4s linear infinite',
          },
          '& .el-1': {
            visibility: 'visible',
            animation: '$visible1by1-1-3 0.4s linear infinite',
          },
          '& .el-2': {
            visibility: 'hidden',
            animation: '$visible1by1-3-3 0.4s linear infinite',
          },
        },
      },
    },
  },
})

const ButtonGithub = () => {
  const isEndScreen = useAppSelector((state) => !!state.screen.end.type)
  const classes = useStyles()

  return (
    <TooltipAll title="GitHub">
      <a
        {...(isEndScreen ? { tabIndex: -1 } : {})}
        accessKey="g"
        className={cx('topbutton', classes.githubButton)}
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        onContextMenu={() => {
          window.open(githubUrl)
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            className="el-0"
            d="M11.968 1.714c-5.82 0-10.541 4.72-10.541 10.54 0 4.657 3.04 8.601 7.178 10.025.518.064.712-.26.712-.518v-1.81c-2.91.646-3.557-1.423-3.557-1.423-.453-1.229-1.164-1.552-1.164-1.552-.97-.647.064-.647.064-.647 1.035.065 1.617 1.1 1.617 1.1.97 1.616 2.458 1.164 3.04.905a2.252 2.252 0 01.646-1.423c-2.328-.258-4.785-1.164-4.785-5.238 0-1.164.388-2.07 1.1-2.845-.066-.194-.454-1.294.128-2.716 0 0 .906-.259 2.91 1.099.841-.259 1.747-.323 2.652-.323s1.81.129 2.651.323c2.005-1.358 2.91-1.1 2.91-1.1.582 1.423.194 2.523.13 2.781a4.183 4.183 0 011.1 2.846c0 4.074-2.458 4.915-4.786 5.173.388.324.711.97.711 1.94v2.91c0 .259.194.582.711.518a10.553 10.553 0 007.179-10.024c-.065-5.82-4.786-10.541-10.606-10.541z"
          />
          <path
            className="el-1"
            d="M11.968 1.714c-5.82 0-10.541 4.72-10.541 10.54 0 4.657 3.04 8.601 7.178 10.025.518.064.712-.26.712-.518v-1.81c-2.91.646-4.396-1.307-4.396-1.307-.453-1.23-1.164-1.552-1.164-1.552-.97-.647.065-.647.065-.647 1.035.065 1.617 1.1 1.617 1.1.97 1.616 3.296 1.048 3.878.789a2.252 2.252 0 01.646-1.423c-2.328-.258-4.785-1.164-4.785-5.238 0-1.164.388-2.07 1.1-2.845-.066-.194-.483-.253.1-1.675 0 0 .934-1.3 2.938.059.841-.26 1.747-.324 2.652-.324s1.81.13 2.651.323c2.005-1.358 2.881-.059 2.881-.059.582 1.423.223 1.482.159 1.74a4.183 4.183 0 011.1 2.846c0 4.074-2.458 4.915-4.786 5.173.388.324.711.97.711 1.94v2.91c0 .259.194.582.711.518 4.3-1.45 7.19-5.487 7.179-10.024-.065-5.82-4.786-10.541-10.606-10.541z"
          />
          <path
            className="el-2"
            d="M11.968 1.714c-5.82 0-10.541 4.72-10.541 10.54 0 4.657 3.04 8.601 7.178 10.025.518.064.712-.26.712-.518v-1.81c-2.91.646-2.66-1.597-2.66-1.597-.454-1.228-1.165-1.552-1.165-1.552-.97-.646.065-.646.065-.646 1.035.064 1.617 1.1 1.617 1.1.97 1.616 1.56 1.337 2.143 1.078a2.252 2.252 0 01.646-1.423c-2.328-.258-4.785-1.164-4.785-5.238 0-1.164.388-2.07 1.1-2.845-.066-.194-.396-2.017.186-3.439 0 0 .848.464 2.852 1.822.841-.259 1.747-.323 2.652-.323s1.81.129 2.651.323c2.005-1.358 2.968-1.823 2.968-1.823.582 1.423.136 3.246.072 3.504a4.183 4.183 0 011.1 2.846c0 4.074-2.458 4.915-4.786 5.173.388.324.711.97.711 1.94v2.91c0 .259.194.582.711.518 4.3-1.45 7.19-5.487 7.179-10.024-.065-5.82-4.786-10.541-10.606-10.541z"
          />
        </svg>
      </a>
    </TooltipAll>
  )
}

export default ButtonGithub

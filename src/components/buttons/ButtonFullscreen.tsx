import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { toggleFullScreen } from '../../utils/fullScreen'
import { I18nContext } from '../../i18n/I18nContext'

const useStyles = createUseStyles<string>({
  '@keyframes moveto-tl': {
    to: {
      transform: 'translate(-1.4px, -1.4px)',
    },
  },
  '@keyframes moveto-tr': {
    to: {
      transform: 'translate(1.4px, -1.4px)',
    },
  },
  '@keyframes moveto-bl': {
    to: {
      transform: 'translate(-1.4px, 1.4px)',
    },
  },
  '@keyframes moveto-br': {
    to: {
      transform: 'translate(1.4px, 1.4px)',
    },
  },

  fullscreenButton: {
    left: 'calc(60% + 9rem)',
    '&:hover': {
      '& svg': {
        '& .el-0': {
          animation: '$moveto-tl 0.6s linear infinite',
        },
        '& .el-1': {
          animation: '$moveto-tr 0.6s linear infinite',
        },
        '& .el-2': {
          animation: '$moveto-bl 0.6s linear infinite',
        },
        '& .el-3': {
          animation: '$moveto-br 0.6s linear infinite',
        },
      },
    },
  },
})

const ButtonFullscreen = () => {
  const _ = useContext(I18nContext)
  const classes = useStyles()

  return (
    <button
      accessKey="t"
      title={_.i18n('Toggle Full Screen')}
      className={cx('topbutton', classes.fullscreenButton)}
      onClick={toggleFullScreen}
    >
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          className="el-0"
          d="m2.09 8.877-0.086-6.187c-0.0033931-0.31548 0.25352-0.57195 0.569-0.568l6.188 0.09c0.49627 0.00613 0.73988 0.60701 0.388 0.957l-1.722 1.721 2.863 2.863-2.658 2.658-2.863-2.863-1.722 1.722c-0.348 0.348-0.949 0.102-0.957-0.393z"
        />
        <path
          className="el-1"
          d="m19.231 7.585 1.722 1.722c0.35033 0.3522 0.95174 0.10774 0.957-0.389l0.09-6.188c0.0034-0.31509-0.25291-0.57138-0.568-0.568l-6.189 0.09c-0.49626 0.00613-0.73988 0.60701-0.388 0.957l1.718 1.713-2.863 2.863 2.658 2.659z"
        />
        <path
          className="el-2"
          d="m2.573 21.839 6.188-0.09c0.49627-0.0061 0.73988-0.607 0.388-0.957l-1.722-1.718 2.863-2.863-2.658-2.659-2.863 2.863-1.722-1.722c-0.35033-0.3522-0.95174-0.10774-0.957 0.389l-0.09 6.188c0 0.315 0.258 0.573 0.573 0.569z"
        />
        <path
          className="el-3"
          d="m14.85 20.832c-0.35253 0.35067-0.10722 0.95262 0.39 0.957l6.187 0.09c0.31548 0.0039 0.57239-0.25252 0.569-0.568l-0.09-6.188c-0.0053-0.49674-0.60667-0.7412-0.957-0.389l-1.722 1.722-2.863-2.863-2.658 2.659 2.863 2.863z"
        />
      </svg>
    </button>
  )
}

export default memo(ButtonFullscreen)

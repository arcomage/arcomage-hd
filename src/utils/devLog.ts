import { noDevLog } from '../constants/devSettings'

const devLog = (
  str: string,
  type?: 'error' | 'bug' | 'warning' | 'info' | 'note',
) => {
  if (!noDevLog) {
    switch (type) {
      case 'error':
        console.log(
          `%c ${type.toUpperCase()} `,
          'background: darkred; color: white; font-weight: bold;',
          str,
        )
        break
      case 'bug':
        console.log(
          `%c ${type.toUpperCase()} `,
          'background: red; color: white; font-weight: bold;',
          str,
        )
        break
      case 'warning':
        console.log(
          `%c ${type.toUpperCase()} `,
          'background: orange; color: white; font-weight: bold;',
          str,
        )
        break
      case 'info':
        console.log(
          `%c ${type.toUpperCase()} `,
          'background: lawngreen; color: black; font-weight: bold;',
          str,
        )
        break
      case 'note':
        console.log(
          `%c ${type.toUpperCase()} `,
          'background: ivory; color: black; font-weight: bold; border: 1px solid black;',
          str,
        )
        break
      default:
        console.log(str)
        break
    }
  }
}

export default devLog

import { noDevLog } from '../constants/devSettings'

const devLog = (str: string) => {
  if (!noDevLog) {
    console.log(str)
  }
}

export default devLog

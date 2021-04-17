const devLog = (str: string) => {
  if (process.env.ISDEV) {
    console.log(str)
  }
}

export default devLog

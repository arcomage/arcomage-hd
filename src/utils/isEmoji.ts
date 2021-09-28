const emojiReg =
  /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff]).?$/

const isEmoji = (str: string) => emojiReg.test(str)

export default isEmoji

// not a very strict test

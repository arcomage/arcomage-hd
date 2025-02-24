export function clarr() {
  var result = ''
  var first = true
  for (var i = 0; i < arguments.length; i++) {
    var val = arguments[i]
    if (val) {
      if (first) {
        result = val
        first = false
      } else {
        result += ' ' + val
      }
    }
  }
  return result
}

export default clarr

/**
 * Check if the device is a touch-only device (that does not have mouse)
 * The method may not be 100% accurate, but should be good enough
 */
const isTouch = 'ontouchstart' in window // && /android|iphone|ipad|ipod|blackberry|windows phone|opera mini|mobile/i.test(navigator.userAgent)

export default isTouch

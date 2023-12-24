const { VITE_SERVER_URL } = import.meta.env

/** @param {HTMLElement} el */
export function getCoords(el) {
  const { top, bottom, left, right, width, height, x, y, toJSON } = el.getBoundingClientRect()
  const centerY = top + height / 2
  const centerX = left + width / 2
  return { centerX, centerY, ...{ top, bottom, left, right, width, height, x, y, toJSON } }
}

export const changeState = ref => (ref.value = !ref.value)

/** @param {string} path */
export const setAvatarPath = path => {
  if (!path || typeof path !== 'string') return
  if (path[0] !== '/') path = '/' + path
  return VITE_SERVER_URL + path
}

/** @param {string} path */
export const roomImg = path => {
  return VITE_SERVER_URL + path
}

export function equalizePoints(p1, p2) {
  p1.x = p2.x
  p1.y = p2.y
  if (p2.id !== undefined) {
    p1.id = p2.id
  }
  return p1
}

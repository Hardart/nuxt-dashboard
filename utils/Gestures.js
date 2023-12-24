import { equalizePoints } from '@utils/helpers'
import Avatar from './Avatar'

/** @typedef {{ x: number; y: number; id?: string | number }} Point */

class Gestures {
  #numActivePoints = 0
  #center = { x: 0, y: 0 }
  #intervalP1 = { x: 0, y: 0 }
  #touchEventEnabled = 'ontouchstart' in window

  constructor(component) {
    /** @type { Avatar} */
    this.comp = component
    this.dragAxis = null
    /** @type {Point} */
    this.p1 = { x: 0, y: 0 } // the first pressed pointer
    /** @type {Point} */
    this.p2 = { x: 0, y: 0 } // the second pressed pointer
    /** @type {Point} */
    this.prevP1 = { x: 0, y: 0 }
    /** @type {Point} */
    this.prevP2 = { x: 0, y: 0 }
    /** @type {Point} */
    this.startP1 = { x: 0, y: 0 }
    /** @type {Point} */
    this.startP2 = { x: 0, y: 0 }
    /** @type {Point} */
    this.offset = { x: 0, y: 0 }

    this.canPan = false
    this.isZooming = false
    this.isDragging = false
  }

  bindMainEvents() {
    const { image } = this.comp
    image.value.onpointerdown = this._onPointerDown.bind(this)
  }

  /**
   *
   * @param {PointerEvent} e
   * @param {Point} p
   */
  updatePoints(e, p) {
    p.x = e.clientX
    p.y = e.clientY
    if ('pointerId' in e) {
      p.id = e.pointerId
    } else if (e.identifier !== undefined) {
      p.id = e.identifier
    }
  }

  /** @param {PointerEvent} e */
  _onPointerDown(e) {
    e.preventDefault()
    this.isDragging = true
    this.updatePoints(e, this.p1)
    equalizePoints(this.startP1, this.p1)
    equalizePoints(this.offset, this.comp.boundsRect)
    document.onpointermove = this._onPointerMove.bind(this)
    document.onpointerup = this._onPointerUp.bind(this)
  }

  /** @param {MouseEvent} e */
  _onPointerMove(e) {
    e.preventDefault()
    const { comp, p1, startP1, offset } = this
    if (!this.isDragging) return
    /** @type {HTMLElement} */

    this.updatePoints(e, p1)

    const deltaY = p1.y - startP1.y + offset.y
    const deltaX = p1.x - startP1.x + offset.x
    // if (!deltaY) return
    comp.boundsRect.y = deltaY
    comp.boundsRect.x = deltaX
    comp._checkBounds()

    // this.comp.borderPos.x = this.p1.x - this.startP1.x + this.offset.x
    comp._setTransformToImage()
  }

  _onPointerUp(e) {
    this.isDragging = false
    document.onpointermove = null
    document.onpointerup = null
  }
}

export default Gestures

import { setAvatarPath } from '@/utils/helpers'
import { ref, unref } from 'vue'
import Gestures from './Gestures'
import { useUserStore } from '@/store/user-store'

export default class Avatar {
  #cleanPath
  #fullWidth
  #fullHeigth
  max = { x: 0, y: 0 }
  min = { x: 0, y: 0 }
  zoomLevel = 1
  zoomRect = { width: 0, height: 0 }
  boundsRect = { width: 0, height: 0, x: 0, y: 0 }
  imageRect = { width: 0, height: 0, x: 0, y: 0 }
  #elems = ['bounds', 'image', 'imageWrap']

  constructor() {
    this._initElement()
    this.path = ref(null)
    this.isUpload = ref(false)
  }

  setImageData({ path, width, height }) {
    this.#fullWidth = width
    this.#fullHeigth = height
    this.#cleanPath = path
    this.path.value = setAvatarPath(path)
  }

  init() {
    this.isUpload.value = true
    this._calcElemsSize()
    this._updateImagePosition()
    this._gestures = new Gestures(this)
    this._gestures.bindMainEvents()
  }

  /** @protected */
  _initElement() {
    this.#elems.forEach(el => (this[el] = ref(null)))
  }

  /** @protected */
  _calcElemsSize() {
    this.#elems.forEach(el => {
      const { width, height } = this.#elementRect(el)
      this[`${el}Rect`] = { width, height, x: 0, y: 0 }
    })
  }

  #aspectRatio() {
    const ratio = this._isVerticalOrientation ? this.#fullHeigth / this.#fullWidth : this.#fullWidth / this.#fullHeigth
    console.log(Math.round(ratio))
    // return Math.round(ratio * 100) / 100
  }

  /** @protected */
  get _isVerticalOrientation() {
    return this.imageRect.width < this.imageRect.height
  }

  /** @param {HTMLElement} target */
  rangeInputHandler(target) {
    const { min, max, value } = target
    const sliderValue = ((value - min) * 100) / max - min
    this.zoomLevel = sliderValue < 1 ? 1 : sliderValue / 50 + 1
    target.style.backgroundSize = `${sliderValue}% 100%`
    this.#updateMinMaxBounds()
    this._checkBounds()
    this._setTransformToImage()
    this.#updateZoomRect()
  }

  _checkBounds() {
    const { boundsRect, min, max } = this
    if (boundsRect.y >= min.y) boundsRect.y = min.y
    if (boundsRect.y <= max.y) boundsRect.y = max.y
    if (boundsRect.x >= min.x) boundsRect.x = min.x
    if (boundsRect.x <= max.x) boundsRect.x = max.x
  }

  /** @protected */
  _updateImagePosition() {
    const { boundsRect, imageRect } = this
    boundsRect.y = (boundsRect.height - imageRect.height) / 2
    boundsRect.x = (boundsRect.width - imageRect.width) / 2
    this.#updateMinMaxBounds()
    this._setTransformToImage()
    this.#updateZoomRect()
  }

  #updateZoomRect() {
    const { imageRect, zoomRect } = this
    zoomRect.width = imageRect.width * this.zoomLevel
    zoomRect.height = imageRect.height * this.zoomLevel
  }

  _setTransformToImage() {
    const { imageWrap, boundsRect, zoomLevel } = this
    imageWrap.value.style.transform = `translate3d(${boundsRect.x}px, ${boundsRect.y}px, 0px) scale3d(${zoomLevel}, ${zoomLevel}, 1)`
  }

  #updateMinMaxBounds() {
    const { imageRect, boundsRect, zoomLevel, min, max } = this

    const deltaX = (imageRect.width * zoomLevel - imageRect.width) / 2
    const deltaY = (imageRect.height * zoomLevel - imageRect.height) / 2
    min.x = deltaX
    max.x = boundsRect.width - imageRect.width - deltaX
    min.y = deltaY
    max.y = boundsRect.height - imageRect.height - deltaY
  }

  #elementRect(el) {
    return this[el].value.getBoundingClientRect()
  }

  #calcAvatarData() {
    const { imageRect, boundsRect, zoomRect, zoomLevel } = this
    const top = zoomLevel > 1 ? Math.round((zoomRect.height - imageRect.height) / 2 + boundsRect.y * -1) : Math.round(boundsRect.y * -1)
    const left = zoomLevel > 1 ? Math.round((zoomRect.width - imageRect.width) / 2 - boundsRect.x) : 0
    const height = Math.round(zoomRect.height)
    const width = Math.round(zoomRect.width)
    return { width, height, left, top, bounds: boundsRect }
  }

  get avatarData() {
    return { path: this.#cleanPath, oldPath: useUserStore().getUser.avatar, image: this.#calcAvatarData() }
  }

  async sendForResize() {
    return await useUserStore().changeAvatar(this.avatarData)
  }
}

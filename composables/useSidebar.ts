interface IParent {
  initClose: (() => void)[]
  closeAll: () => void
}
const delay = (ms: number = 0) => new Promise(res => setTimeout(res, ms))
const exec = async (fn: () => void) => {
  await delay()
  fn()
}

const parent = reactive<IParent>({
  initClose: [],
  async closeAll() {
    if (typeof this.initClose !== 'object') return
    const promises = parent.initClose.map(exec)
    await Promise.all(promises)
    this.initClose = []
  },
})

export const useSidebar = () => {
  const initClose = (fn: () => void) => {
    if (typeof parent.initClose !== 'object') return
    parent.initClose.push(fn)
  }
  return { initClose, parent }
}

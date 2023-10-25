const controls = ['textbox', 'bold', 'italic', 'underline', 'left', 'center', 'right', 'code'] as const
type Controls = (typeof controls)[number]

export class HdEditor {
  private root: HTMLElement
  private selection: string | null = null
  private line: HTMLElement
  private isHtml: boolean = false
  private elements: Record<Controls, HTMLElement>
  private target: HTMLElement | null = null
  private lineCount: number = 1
  constructor(rootElem: Ref<HTMLElement | null>) {
    if (!rootElem.value) throw createError('NO root editor element')
    this.root = rootElem.value
    this.elements = convertArrayToObject(controls, this.root)
    this.line = this.initFirsChild()
    this.initMethods()
  }

  private get classTite() {
    return HdEditor.name
  }

  initMethods() {
    const objKeys = Object.keys(this.elements) as (keyof typeof this.elements)[]
    objKeys.forEach(key => {
      const method = ('on' + key[0].toUpperCase() + key.slice(1)) as keyof HdEditor
      if (!this[method]) throw createError(`Method: ${method} is not exist in class ${this.classTite}`)
      const elem = this.elements[key]
      if (!elem) throw createError(`no key:${elem} in elements object`)
      const bindMethod = this[method].bind(this)
      elem.addEventListener('click', bindMethod)
    })
    this.elements.textbox?.addEventListener('keyup', this.onKeydown.bind(this))
  }

  info() {
    // console.log(this.elements)
  }

  initLine() {
    if (!this.target) return (this.line = this.initFirsChild())
    if (this.target.tagName == 'SPAN') {
      const parent = this.target.parentElement
      if (!parent) return (this.line = this.initFirsChild())
      this.target = parent
    }
    const { textbox } = this.elements
    if (textbox == this.target) return textbox.lastChild as HTMLElement
    this.line = this.target
  }

  private initFirsChild() {
    const { textbox } = this.elements
    if (!textbox.children[0]) textbox.insertAdjacentHTML('afterbegin', '<div><br/>></div>')
    if (textbox.children[0].textContent) {
      const text = textbox.children[0].textContent
      if (text.includes('<div>')) textbox.innerHTML = text
    }

    return textbox.children[0] as HTMLElement
  }

  initSelection() {
    const selected = window.getSelection()
    if (!selected) return
    this.selection = selected.toString()
  }

  innerText() {
    return this.elements.textbox.innerText
  }

  onBold() {
    if (!this.line) return
    this.line.classList.toggle('font-bold')
    this.elements.textbox.focus()
  }

  onItalic() {
    this.line.classList.toggle('italic')
    this.elements.textbox.focus()
  }

  onUnderline() {
    this.line.classList.toggle('underline')
    this.elements.textbox.focus()
  }

  onTextbox(e: Event) {
    this.target = e.target as HTMLElement
    this.initLine()
  }

  onLeft() {
    this.removeClasses(this.line, 'text-center', 'text-right')
    this.line.classList.add('text-left')
    this.elements.textbox.focus()
  }

  onCenter() {
    this.removeClasses(this.line, 'text-left', 'text-right')
    this.line.classList.add('text-center')
    this.elements.textbox.focus()
  }

  onRight() {
    this.removeClasses(this.line, 'text-left', 'text-center')
    this.line.classList.add('text-right')
    this.elements.textbox.focus()
  }

  onCode() {
    this.elements.textbox[this.isHtml ? 'innerHTML' : 'innerText'] = this.elements.textbox[!this.isHtml ? 'innerHTML' : 'innerText']
    this.isHtml = !this.isHtml
  }

  private removeClasses(el: HTMLElement, ...args: string[]) {
    el.classList.remove(...args)
  }

  private onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Enter':
        this.line = this.elements.textbox?.lastChild as HTMLElement
        this.lineCount++
        break
      case 'ArrowUp':
        this.textareaChildrens.forEach((l, index) => {
          if (l == this.line && index) {
            this.line = this.textareaChildrens[index - 1]
          }
        })

        break
      case 'Backspace':
        if (this.line.innerText.trim() != '') return console.log(true)

        if (!this.isLineCountEqualTextareaChildrens) {
          for (const line of this.textareaChildrens) {
            for (const child of line.children) {
              child.removeAttribute('style')
              const text = child.textContent || ''
              child.remove()
              line.insertAdjacentHTML('beforeend', text)
              this.line = line
            }
          }
          if (this.lineCount !== 1) this.lineCount--
        }

        break
    }
  }

  private get textareaChildrens() {
    return [...this.elements.textbox.children] as HTMLElement[]
  }

  private get isLineCountEqualTextareaChildrens() {
    return this.elements.textbox.children.length == this.lineCount
  }
}

function convertArrayToObject(list: readonly Controls[], root: HTMLElement) {
  const map = {} as Record<Controls, HTMLElement>
  return list.reduce((acc, curr) => {
    const domElem = root.querySelector<HTMLElement>(`[data-type="${curr}"]`)
    if (!domElem) throw createError(`Element with '[data-type="${curr}"]' is no defined`)
    acc[curr] = domElem
    return acc
  }, map)
}

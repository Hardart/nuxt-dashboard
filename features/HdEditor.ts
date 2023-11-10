const controls = ['textbox', 'bold', 'italic', 'underline', 'left', 'center', 'right', 'code'] as const
type Controls = (typeof controls)[number]

class HdEditorBase {
  protected root: HTMLElement
  protected selection: string | null = null
  protected line: HTMLElement
  protected isHtml: boolean = false
  protected elements: Record<Controls, HTMLElement>
  protected target: HTMLElement | null = null
  protected lineCount: number = 1
  constructor(rootElem: Ref<HTMLElement | null>) {
    if (!rootElem.value) throw createError('NO root editor element')
    this.root = rootElem.value
    this.elements = convertArrayToObject(controls, this.root)
    this.line = this.initFirsChild()
  }

  protected get classTite() {
    return HdEditor.name
  }

  info() {
    console.log(this.elements)
  }

  protected initLine() {
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

  protected initFirsChild() {
    const { textbox } = this.elements

    if (!textbox.children[0].textContent) {
      textbox.children[0].remove()
      textbox.insertAdjacentHTML('afterbegin', '<div><br/></div>')
    } else {
      const text = textbox.children[0].textContent
      if (text.includes('<div>')) textbox.innerHTML = text
    }

    return textbox.children[0] as HTMLElement
  }

  // initSelection() {
  //   const selected = window.getSelection()
  //   if (!selected) return
  //   this.selection = selected.toString()
  // }

  protected removeClasses(el: HTMLElement, ...args: string[]) {
    el.classList.remove(...args)
  }

  protected get textareaChildrens() {
    return [...this.elements.textbox.children] as HTMLElement[]
  }

  protected get isLineCountEqualTextareaChildrens() {
    return this.elements.textbox.children.length == this.lineCount
  }
}

class HdEditorMethods extends HdEditorBase {
  protected onBold() {
    if (!this.line) return
    this.line.classList.toggle('font-bold')
    this.elements.textbox.focus()
  }

  protected onItalic() {
    this.line.classList.toggle('italic')
    this.elements.textbox.focus()
  }

  protected onUnderline() {
    this.line.classList.toggle('underline')
    this.elements.textbox.focus()
  }

  protected onTextbox(e: Event) {
    this.target = e.target as HTMLElement
    this.initLine()
  }

  protected onLeft() {
    this.removeClasses(this.line, 'text-center', 'text-right')
    this.line.classList.add('text-left')
    this.elements.textbox.focus()
  }

  protected onCenter() {
    this.removeClasses(this.line, 'text-left', 'text-right')
    this.line.classList.add('text-center')
    this.elements.textbox.focus()
  }

  protected onRight() {
    this.removeClasses(this.line, 'text-left', 'text-center')
    this.line.classList.add('text-right')
    this.elements.textbox.focus()
  }

  protected onCode() {
    this.elements.textbox[this.isHtml ? 'innerHTML' : 'innerText'] = this.elements.textbox[!this.isHtml ? 'innerHTML' : 'innerText']
    this.isHtml = !this.isHtml
  }

  protected onKeydown(e: KeyboardEvent) {
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
        // if (this.line.innerText.trim() != '') return console.log(this.line.innerText)
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
}

export class HdEditor extends HdEditorMethods {
  constructor(rootElem: Ref<HTMLElement | null>) {
    super(rootElem)

    this.initMethods()
  }

  protected initMethods() {
    const objKeys = Object.keys(this.elements) as (keyof typeof this.elements)[]
    objKeys.forEach(key => {
      const method = ('on' + key[0].toUpperCase() + key.slice(1)) as keyof HdEditorBase
      if (!this[method]) throw createError(`Method: ${method} is not exist in class ${this.classTite}`)
      const elem = this.elements[key]
      if (!elem) throw createError(`no key:${elem} in elements object`)
      const bindMethod = this[method].bind(this)
      elem.addEventListener('click', bindMethod)
    })
    this.elements.textbox?.addEventListener('keyup', this.onKeydown.bind(this))
  }

  textContent() {
    return this.elements.textbox[this.isHtml ? 'innerText' : 'innerHTML']
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

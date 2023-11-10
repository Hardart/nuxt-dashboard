<script setup lang="ts">
interface IControls {
  title?: string
  icon?: string
  type: string
  customClass: string
  action?: () => void
}

const textbox = ref<HTMLElement | null>(null)
const isHtml = ref(false)
const activeLine = ref<HTMLElement | null>(null)
const selectedElement = ref<Selection | null>(null)

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: string
  name?: string
}>()

function onBold() {
  const selection = getSelection()
  if (selection) changeStyleToSelection(selection)
  else activeLine.value?.classList.toggle('font-bold')
  emit('update:modelValue', textbox.value![isHtml ? 'innerHTML' : 'innerText'])
  // console.log(textbox.value![isHtml ? 'innerHTML' : 'innerText'])
}

function onItalic() {}

function onCode() {
  if (!textbox || !textbox.value) return
  textbox.value[isHtml.value ? 'innerHTML' : 'innerText'] = props.modelValue || '<div><br/></div>'
  isHtml.value = !isHtml.value
}

function onEnter() {
  // console.log('enter')
}

function onClick(e: Event) {
  const target = e.target as HTMLElement
  if (target.parentElement?.dataset?.type !== 'textbox') return
  activeLine.value = target
}

function setDescriptionText() {
  if (!textbox || !textbox.value) return
  emit('update:modelValue', `<div>${props.modelValue}</div>`)
}

function getSelection() {
  const { anchorNode, focusNode, anchorOffset, focusOffset } = selectedElement.value! // selection properties
  const searchString = anchorNode?.textContent
  const selectedStr = searchString!.substring(anchorOffset, focusOffset)

  const selection = selectedElement.value?.toString()
  return selection ? selection : null
}

function changeStyleToSelection(selectionString: string) {
  const searchString = activeLine.value!.innerHTML
  activeLine.value!.innerHTML = searchString.replace(selectionString, `<span class="font-bold">${selectionString}</span>`)
}

const controls: IControls[][] = [
  [
    { title: 'B', type: 'bold', customClass: 'font-bold', action: onBold },
    { title: 'I', type: 'italic', customClass: 'italic', action: onItalic },
    { title: 'U', type: 'underline', customClass: 'underline' },
  ],
  [
    { icon: 'heroicons:bars-3-bottom-left', type: 'left', customClass: '' },
    { icon: 'heroicons:bars-3-solid', type: 'center', customClass: '' },
    { icon: 'heroicons:bars-3-bottom-right', type: 'right', customClass: '' },
  ],
  [
    { icon: 'heroicons:link', type: 'link', customClass: '' },
    { icon: 'heroicons:photo', type: 'photo', customClass: '' },
    { icon: 'heroicons:sparkles', type: 'code', customClass: '', action: onCode },
  ],
]

onMounted(() => {
  const editor = textbox.value
  if (!editor) return
  const { modelValue: descriptionText } = props
  if (descriptionText && !descriptionText.includes('<div')) setDescriptionText()
  editor.innerHTML = descriptionText ? `<div>${descriptionText}</div>` : '<div><br/></div>'
  activeLine.value = editor.children[0] as HTMLElement
  selectedElement.value = window.getSelection()
})

watch([() => props.modelValue, () => textbox.value?.children.length], ([descText, oldLength], [_, newLength]) => {
  if (descText == '<br>') textbox.value!.innerHTML = '<div><br/></div>'
  if (oldLength && oldLength !== newLength) activeLine.value = textbox.value!.children[oldLength - 1] as HTMLElement
})
</script>

<template>
  <div class="space-y-1">
    <div class="flex gap-4 items-center">
      <div v-for="group in controls" class="flex gap-1">
        <button
          v-for="{ customClass, icon, title, type, action } in group"
          class="grid place-content-center text-md rounded w-7 h-7 bg-slate-400 hover:bg-slate-500 active:bg-slate-600 transition-colors"
          :class="[customClass, type == 'code' && isHtml && 'bg-slate-600']"
          type="button"
          :data-type="type"
          @click="action"
        >
          <Icon v-if="icon" :name="icon" />
          <span v-else>{{ title }}</span>
        </button>
      </div>
    </div>
    <div
      ref="textbox"
      data-type="textbox"
      role="textbox"
      contenteditable
      spellcheck
      class="w-full h-64 bg-white focus:border-sky-500 focus:ring-sky-500 focus:ring-1 px-2 py-1 text-sm z-10 overflow-hidden overflow-y-auto"
      tabindex="0"
      @keydown.enter="onEnter"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)[!isHtml ? 'innerHTML' : 'innerText'])"
      @click="onClick"
    >
      <div>{{ modelValue }}</div>
    </div>
  </div>
</template>

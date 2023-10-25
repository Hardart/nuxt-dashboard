<script setup lang="ts">
import { HdEditor } from '@/features/HdEditor'
const rootEditor = ref<HTMLElement | null>(null)
const textbox = ref<HTMLElement | null>(null)
interface IControls {
  title?: string
  icon?: string
  type: string
  customClass: string
}
const controls: IControls[][] = [
  [
    { title: 'B', type: 'bold', customClass: 'font-bold' },
    { title: 'I', type: 'italic', customClass: 'italic' },
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
    { icon: 'heroicons:sparkles', type: 'code', customClass: '' },
  ],
]
let editor: HdEditor

onMounted(() => {
  editor = new HdEditor(rootEditor)
})

const props = defineProps<{
  modelValue?: string
  text?: string
}>()
const emit = defineEmits(['update:modelValue'])
const showTextbox = async () => {
  if (!textbox.value) return
  const elem = textbox.value
  await delay(0)

  emit('update:modelValue', elem.innerHTML)
}
</script>

<template>
  <div ref="rootEditor" class="space-y-1">
    <div class="flex gap-4 items-center">
      <div v-for="group in controls" class="flex gap-1">
        <button
          v-for="{ customClass, icon, title, type } in group"
          class="grid place-content-center text-md rounded w-7 h-7 bg-slate-400 hover:bg-slate-500 active:bg-slate-600 transition-colors"
          :class="customClass"
          type="button"
          :data-type="type"
          @click="showTextbox"
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
      @input="$emit('update:modelValue', ($event.target as HTMLElement).innerHTML)"
    >
      <div>{{ text }}</div>
    </div>
  </div>
</template>

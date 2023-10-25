<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string
    label?: string
    isRequried?: boolean
    placeholder?: string
    contentBefore?: any
    contentAfter?: any
    modelValue?: any
  }>(),
  {
    type: 'text',
    isRequried: false,
  }
)

defineEmits(['change', 'update:modelValue'])
</script>

<template>
  <label class="w-full">
    <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700" :class="isRequried && `after:content-['*']`">
      {{ label }}
    </span>
    <div class="relative">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" v-if="contentBefore">
        <span class="text-gray-500 sm:text-sm">{{ contentBefore }}</span>
      </div>
      <input
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value.trim())"
        :type="type"
        class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 appearance-none"
        :class="[contentAfter && 'pr-7', contentBefore && 'pl-7']"
        :placeholder="placeholder"
        :required="isRequried"
        :value="modelValue"
      />
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="contentAfter">
        <span class="text-gray-500 sm:text-sm">{{ contentAfter }}</span>
      </div>
    </div>
  </label>
</template>

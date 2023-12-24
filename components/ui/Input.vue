<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: string
    label?: string
    isRequried?: boolean
    placeholder?: string
    contentBefore?: any
    contentAfter?: any
    modelValue?: any
    name?: string
    icon?: string
  }>(),
  {
    type: 'text',
    isRequried: false,
  }
)

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label class="w-full">
      <span
        v-if="label"
        class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
        :class="isRequried && `after:content-['*']`"
      >
        {{ label }}
      </span>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" v-if="contentBefore">
          <span class="text-gray-500 sm:text-sm">{{ contentBefore }}</span>
        </div>
        <input
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          :type="type"
          class="px-3 py-2 bg-white border shadow-md placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-lg sm:text-sm focus:ring-1 appearance-none"
          :class="[contentAfter && 'pr-7', contentBefore && 'pl-7', label && 'mt-1']"
          :placeholder="placeholder"
          :required="isRequried"
          :value="modelValue"
          :name="name"
        />
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3" v-if="contentAfter">
          <span class="text-gray-500 sm:text-sm">{{ contentAfter }}</span>
        </div>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400" v-if="icon">
          <Icon :name="`heroicons:${icon}`" />
        </div>
      </div>
    </label>
  </div>
</template>

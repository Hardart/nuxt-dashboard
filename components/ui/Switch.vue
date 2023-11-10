<script setup lang="ts">
defineProps<{
  modelValue?: boolean
}>()

defineEmits(['change', 'update:modelValue'])
</script>

<template>
  <HSwitchGroup class="flex items-center" as="div">
    <HSwitchLabel class="mr-2">Опубликовать</HSwitchLabel>
    <HSwitch
      :model-value="modelValue"
      @update:model-value="value => $emit('update:modelValue', value)"
      :class="modelValue ? 'bg-green-600' : 'bg-white'"
      class="relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-inner"
    >
      <span class="sr-only">Enable notifications</span>
      <span
        :class="modelValue ? 'translate-x-6' : 'translate-x-1'"
        class="inline-block h-5 w-5 transform rounded-full bg-gray-200 transition shadow-inner"
      />
    </HSwitch>
  </HSwitchGroup>
</template>

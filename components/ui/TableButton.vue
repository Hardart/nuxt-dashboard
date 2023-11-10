<script setup lang="ts">
enum ColorClass {
  POSITIVE = 'bg-sky-700 hover:bg-sky-800',
  NEGATIVE = 'bg-red-600 hover:bg-red-700',
}
defineProps<{
  iconName: string
  color: 'NEGATIVE' | 'POSITIVE'
}>()
</script>

<template>
  <button class="p-[9px] text-white flex rounded-full mx-auto my-1.5" :class="ColorClass[color]">
    <Icon :name="`heroicons:${iconName}`" size="18" />
  </button>
</template>

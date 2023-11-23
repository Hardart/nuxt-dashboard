<script lang="ts" setup>
defineProps<{
  icon: 'arrow-up' | 'arrow-down' | 'arrow-path'
  iconClass?: string
  size: string
  active?: boolean
}>()
</script>

<template>
  <button
    class="flex bg-white rounded-lg text-neutral-800 shadow-md border active:shadow-sm group"
    :class="[!active && '!text-neutral-400']"
  >
    <Icon :name="`heroicons:${icon}`" :size="size" :class="iconClass" />
  </button>
</template>

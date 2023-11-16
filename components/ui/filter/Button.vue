<script lang="ts" setup>
defineProps<{
  icon: 'arrow-up' | 'arrow-down' | 'arrow-path'
  iconClass?: string
}>()
</script>

<template>
  <button class="flex bg-white p-2 rounded-lg shadow-md border active:shadow-sm group">
    <Icon :name="`heroicons:${icon}`" size="20" :class="iconClass" />
  </button>
</template>

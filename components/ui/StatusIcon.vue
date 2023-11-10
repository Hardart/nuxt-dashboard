<script setup lang="ts">
defineProps<{
  status: string
}>()
</script>

<template>
  <div class="flex justify-center items-center w-6 h-6 rounded-full" :class="status == 'ACTIVE' ? 'bg-green-400/30' : 'bg-neutral-300/30'">
    <div class="bg-neutral-400 rounded-full h-3 w-3" :class="status == 'ACTIVE' ? 'bg-green-500' : 'bg-neutral-400/30'"></div>
  </div>
</template>

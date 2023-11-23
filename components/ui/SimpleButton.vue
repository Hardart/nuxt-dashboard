<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <button class="px-5 py-2 bg-sky-500 text-white rounded-sm hover:bg-sky-600 active:bg-sky-700">{{ text }}</button>
</template>

<style></style>

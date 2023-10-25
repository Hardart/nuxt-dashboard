<script lang="ts" setup>
defineProps<{
  title: string
  to?: string
  icon?: string
}>()
</script>

<template>
  <div class="bg-slate-100 flex flex-col w-full rounded-xl">
    <div class="flex flex-grow items-start px-5 pt-5 gap-x-3">
      <h3 class="text-xl font-bold">{{ title }}</h3>
    </div>
    <div class="px-3 pb-5 mt-6">
      <NuxtLink :to="to" class="body p-2">открыть</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>

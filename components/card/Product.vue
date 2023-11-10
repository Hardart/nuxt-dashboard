<script lang="ts" setup>
defineProps<{
  title: string
  to?: string
  icon?: string
  category?: ICategory
}>()
</script>

<template>
  <div class="bg-slate-100 flex flex-col w-full px-5 rounded-xl">
    <div class="text-right text-sm pt-5">{{ category?.title }}</div>
    <div class="flex flex-grow items-start pt-5 gap-x-3">
      <h3 class="text-xl font-bold">{{ title }}</h3>
    </div>
    <div class="pb-5 mt-6">
      <NuxtLink :to="to" class="body">открыть</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>

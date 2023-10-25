<script lang="ts" setup>
defineProps<{
  title: string
  to?: string
  icon?: string
}>()
</script>

<template>
  <div class="bg-slate-100 flex flex-col w-full rounded-xl">
    <div class="header px-5 pt-5 flex items-center gap-x-3">
      <Icon :name="icon || `heroicons:chart-bar`" class="text-4xl" />
      <h3 class="text-3xl">{{ title }}</h3>
    </div>
    <div class="px-3 pb-5 mt-6">
      <NuxtLink :to="to" class="body p-2">открыть</NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>

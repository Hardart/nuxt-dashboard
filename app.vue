<script lang="ts" setup>
await useMeta().getAppSettings()
const { defaults } = await $fetch('/api/filter-params')
useState('defaultLimit', () => defaults.limit)
</script>
<template>
  <div class="fixed w-full">
    <Header />
    <div class="h-sidebar grid grid-cols-7 mx-auto bg-slate-100">
      <Sidebar class="md:col-span-2 lg:col-span-1" />
      <div class="bg-slate-200/50 max-md:col-span-full md:col-span-5 xl:col-span-6">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style></style>

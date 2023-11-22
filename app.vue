<script lang="ts" setup>
await useMeta().getAppSettings()
</script>
<template>
  <div class="fixed w-full">
    <Header />
    <div class="h-sidebar grid grid-cols-12 mx-auto bg-slate-100">
      <Sidebar class="md:col-span-3 lg:col-span-3 xl:col-span-2" />
      <div class="bg-slate-200/50 max-md:col-span-full md:col-span-9 xl:col-span-8 overflow-y-auto">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style></style>

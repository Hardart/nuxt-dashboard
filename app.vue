<script lang="ts" setup>
const { filter, productForm } = await $fetch('/api/settings')
useState('defaultLimit', () => filter.defaults.limit)
useState('productForm', () => productForm)
useState('filterParams', () => filter)
</script>
<template>
  <div class="fixed w-full">
    <Header />
    <div class="h-sidebar flex mx-auto bg-slate-100">
      <Sidebar class="w-[220px] max-lg:w-[180px]" />
      <div class="bg-slate-200/50 flex-grow">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<style></style>

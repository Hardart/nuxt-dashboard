<script lang="ts" setup>
import { useCategoriesStore } from './store/useCategoriesStore'

useCategoriesStore().loadCategoriesList()
</script>
<template>
  <Header />
  <div class="h-sidebar grid grid-cols-12 mx-auto bg-slate-100">
    <Sidebar class="md:col-span-3 lg:col-span-3 xl:col-span-2" />
    <div class="bg-slate-200/50 max-md:col-span-full md:col-span-9 xl:col-span-8">
      <NuxtPage />
    </div>
  </div>
</template>

<style></style>

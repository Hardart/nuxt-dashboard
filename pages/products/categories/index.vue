<script lang="ts" setup>
const { getCategories } = useCategories()
const categories = await getCategories()
</script>

<template>
  <div class="p-10">
    <div class="flex gap-4">
      <CardCategory v-for="{ title, link } in categories" :title="title" :to="link" />
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped></style>

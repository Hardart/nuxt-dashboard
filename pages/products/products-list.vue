<script lang="ts" setup>
const { products } = await useProducts()
</script>

<template>
  <div class="grid grid-cols-3 gap-3 p-10">
    <CardProduct v-for="{ title, link } in products" :title="title" :to="link" />
  </div>
</template>

<style scoped></style>

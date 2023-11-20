<script lang="ts" setup>
const { products } = useProducts()
const { data, pending } = products
</script>

<template>
  <div v-if="pending">ЗАГРУЗКА</div>
  <div v-else v-for="product in data">{{ product.title }}</div>
  <NuxtPage />
</template>

<style scoped></style>
